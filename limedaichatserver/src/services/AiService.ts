import { loadVectorStore } from "@/services/VectorStoreService";
import { getChatHistory } from "@/services/ChatHistoryService";
import { createHistoryRetriever, createQAChain } from "@/services/ChainService";
import {
  createAndEmitMessage,
  handleContextMessages,
} from "@/services/MessageService";
import { Server as SocketIOServer } from "socket.io";
import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import dotenv from "dotenv";
import { Types } from "mongoose";
import { ITextbook } from "@/types";
import { Document as LangChainDocument } from "langchain/document";

dotenv.config();

/**
 * Handle creating the AI and context response to the user's message.
 * @author Sriram Sundar
 *
 * @async
 * @param {SocketIOServer} io
 * @param {Map<string, string>} userSocketMap
 * @param {Types.ObjectId} sender
 * @param {ITextbook} textbook
 * @param {string} content
 * @returns {Promise<void>}
 */
const handleAIResponse = async (
  io: SocketIOServer,
  userSocketMap: Map<string, string>,
  sender: Types.ObjectId,
  textbook: ITextbook,
  content: string
): Promise<void> => {
  try {
    const vectorStore = await loadVectorStore(
      textbook.vectorStorePath as string
    );
    const chatHistory = await getChatHistory(
      sender,
      textbook._id as Types.ObjectId
    );

    const llm = new ChatOpenAI({
      model: "gpt-4",
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.2,
    });

    const contextualizeQSystemPrompt = `
鉴于聊天记录和用户的最新提问（可能引用了聊天记录中的内容），
请用中文重新表述一个独立的问题，使其在没有聊天记录的情况下也能被理解。
请不要回答问题，只需在需要时重新表述，否则按原样返回。`;

    const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
      { role: "system", content: contextualizeQSystemPrompt },
      new MessagesPlaceholder("chat_history"),
      { role: "user", content: "{input}" },
    ]);

    const historyRetriever = await createHistoryRetriever(
      vectorStore,
      llm,
      contextualizeQPrompt
    );

    const qaSystemPrompt = `
你是一个负责问答任务的助手。请使用以下检索到的上下文来回答问题。
你的回答应该使用中文。如果你不知道答案，只需说“我不知道”。请尽量简洁，用不超过三句话来回答。
{context}`;

    const qaPrompt = ChatPromptTemplate.fromMessages([
      { role: "system", content: qaSystemPrompt },
      new MessagesPlaceholder("chat_history"),
      { role: "user", content: "{input}" },
    ]);

    const ragChain = await createQAChain(llm, qaPrompt, historyRetriever);

    const response = await ragChain.invoke({
      input: content,
      chat_history: chatHistory,
    });

    const userSocketId = userSocketMap.get(sender.toString());

    if (userSocketId) {
      await createAndEmitMessage(
        io,
        userSocketId,
        textbook._id as Types.ObjectId,
        sender,
        response.answer as string
      );
    }

    const contextDocuments = response.context as LangChainDocument[];

    if (Array.isArray(contextDocuments) && contextDocuments.length > 0) {
      await handleContextMessages(
        io,
        userSocketId as string,
        textbook._id as Types.ObjectId,
        sender,
        contextDocuments
      );
    }
  } catch (error) {
    console.error("Error handling AI response:", error);
  }
};

export default { handleAIResponse };
