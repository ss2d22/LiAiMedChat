import { ITextbook, UserSocketMap } from "@/types";
import { Server as SocketIOServer } from "socket.io";
import Message from "@/models/MessageSchema";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { Document } from "langchain/document";
import { cleanText, splitTextIntoChunks } from "@/utils/textUtils";
import dotenv from "dotenv";
import { Types } from "mongoose";

dotenv.config();

/**
 * Handles generating AI responses using LangChain and OpenAI.
 *
 * @author Sriram Sundar
 *
 * @param io - The Socket.IO server instance.
 * @param userSocketMap - A map of user IDs to socket IDs.
 * @param sender - The sender's ObjectId.
 * @param textbook - The textbook document.
 * @param content - The message content.
 *
 * @returns {Promise<void>}
 */
const handleAIResponse = async (
  io: SocketIOServer,
  userSocketMap: UserSocketMap,
  sender: Types.ObjectId | undefined,
  textbook: ITextbook,
  content: string
): Promise<void> => {
  try {
    // Load the vector store for the textbook
    const vectorStore = await FaissStore.loadFromPython(
      textbook.vectorStorePath as string,
      new OpenAIEmbeddings()
    );
    console.log("Vector store loaded");

    // Retrieve the most recent messages between the user and the textbook, excluding context messages
    const chatHistoryMessages = await Message.find({
      $or: [
        { sender: sender, receiver: textbook._id },
        { sender: textbook._id, receiver: sender },
      ],
      messageType: { $ne: "context" }, // Exclude context messages
    })
      .sort({ timeStamp: -1 })
      .limit(10);

    console.log("Chat history loaded");

    // Reverse the messages to maintain chronological order
    const chat_history: BaseMessage[] = chatHistoryMessages
      .reverse()
      .map((msg) => {
        if (msg.sender.toString() === sender?.toString()) {
          return new HumanMessage(msg.content as string);
        } else {
          return new AIMessage(msg.content as string);
        }
      });

    console.log("Chat history converted");

    // Set up the OpenAI model
    const llm = new ChatOpenAI({
      model: "gpt-4",
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.2,
    });
    console.log("OpenAI model set up");

    // Contextualize question prompt
    const contextualizeQSystemPrompt = `
鉴于聊天记录和用户的最新提问（可能引用了聊天记录中的内容），
请用中文重新表述一个独立的问题，使其在没有聊天记录的情况下也能被理解。
请不要回答问题，只需在需要时重新表述，否则按原样返回。`;

    const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
      { role: "system", content: contextualizeQSystemPrompt },
      new MessagesPlaceholder("chat_history"),
      { role: "user", content: "{input}" },
    ]);
    console.log("Contextualize question prompt set up");

    // Create a history-aware retriever
    const retriever = vectorStore.asRetriever({ k: 3 }); // Limit to top 3 documents
    const historyAwareRetriever = await createHistoryAwareRetriever({
      llm,
      retriever,
      rephrasePrompt: contextualizeQPrompt,
    });
    console.log("History-aware retriever set up");

    // Answer question prompt
    const qaSystemPrompt = `
你是一个负责问答任务的助手。请使用以下检索到的上下文来回答问题。
你的回答应该使用中文。
如果你不知道答案，只需说“我不知道”。
请尽量简洁，用不超过三句话来回答。

{context}`;
    console.log("Answer question prompt set up");

    const qaPrompt = ChatPromptTemplate.fromMessages([
      { role: "system", content: qaSystemPrompt },
      new MessagesPlaceholder("chat_history"),
      { role: "user", content: "{input}" },
    ]);
    console.log("QA prompt set up");

    // Create the question-answering chain
    const questionAnswerChain = await createStuffDocumentsChain({
      llm,
      prompt: qaPrompt,
    });
    console.log("QA chain set up");

    // Create the retrieval chain
    const ragChain = await createRetrievalChain({
      retriever: historyAwareRetriever,
      combineDocsChain: questionAnswerChain,
    });
    console.log("Retrieval chain set up");

    console.log(content);
    console.log(chat_history);

    // Generate the AI response
    const response = await ragChain.invoke({
      input: content,
      chat_history,
    });
    console.log("AI response generated");
    console.log("AI response: ", response);

    // Create and save the AI message
    const aiMessage = await Message.create({
      sender: textbook._id,
      receiver: sender,
      senderModel: "Textbook",
      receiverModel: "User",
      isAI: true,
      messageType: "text",
      content: response.answer,
      timeStamp: new Date(),
    });
    console.log("AI message created");

    const userSocketId = userSocketMap.get(sender?.toString() || "");
    if (userSocketId) {
      io.to(userSocketId).emit("receive-message", aiMessage);
    }

    // Handle context documents
    const contextDocuments = response.context as Document[];

    if (Array.isArray(contextDocuments) && contextDocuments.length > 0) {
      //sending the top 3 context documents which is all but will test and balance accordingly
      const selectedDocuments = contextDocuments.slice(0, 3);

      for (let i = 0; i < selectedDocuments.length; i++) {
        const doc = selectedDocuments[i];
        console.log("Original Document Content:", doc.pageContent);

        const cleanedPageContent = cleanText(doc.pageContent);

        console.log("Cleaned Document Content:", cleanedPageContent);

        const messageHeader = `【片段${i + 1}】\n`;

        const maxMessageLength = 1000;

        const contentChunks = splitTextIntoChunks(
          cleanedPageContent,
          maxMessageLength - messageHeader.length
        );

        let isFirstChunk = true;

        for (let j = 0; j < contentChunks.length; j++) {
          const chunkContent =
            (isFirstChunk ? messageHeader : "") + contentChunks[j];
          isFirstChunk = false;

          const contextMessage = await Message.create({
            sender: textbook._id,
            receiver: sender,
            senderModel: "Textbook",
            receiverModel: "User",
            isAI: true,
            messageType: "context",
            content: chunkContent,
            timeStamp: new Date(),
          });
          console.log("Context message created");

          if (userSocketId) {
            io.to(userSocketId).emit("receive-message", contextMessage);
          }
        }
      }
    } else {
      console.log("No context documents available.");
    }
  } catch (error) {
    console.error("Error handling AI response:", error);
  }
};

export default {
  handleAIResponse,
};
