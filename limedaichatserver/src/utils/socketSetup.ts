import { Socket, Server as SocketIOServer } from "socket.io";
import { Server } from "http";
import { UserSocketMap, IMessage } from "@/types";
import dotenv from "dotenv";
import Message from "@/models/MessageSchema";
import Textbook from "@/models/Textbookmodel";
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

dotenv.config();

/**
 * socketSetup is a function that sets up the socket server and
 * returns the socketIoServer
 * @author Sriram Sundar
 *
 * @param {Server} - express server
 * @returns {SocketIOServer}
 */
const setupSocket = (server: Server): SocketIOServer => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.FRONT_ORIGIN,
      methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
      credentials: true,
    },
  });

  const userSocketMap: UserSocketMap = new Map();

  const handleSendMessage = async (message: Partial<IMessage>) => {
    console.log("Received message: ", message);
    const { sender, content, receiver, receiverModel, isAI, messageType } =
      message;

    try {
      // Fetch the selected textbook based on the receiver ID
      console.log("Receiver ID: ", receiver);

      const textbook = await Textbook.findById(receiver);
      if (!textbook) {
        throw new Error("Textbook not found");
      }

      // Create and save the user message
      const createdMessage = await Message.create({
        sender,
        receiver: textbook._id,
        receiverModel,
        senderModel: "User",
        isAI,
        messageType,
        content: content,
        timeStamp: new Date(),
      });

      // Send the user message back to the user (if needed)
      const userSocketId = userSocketMap.get(sender?.toString() || "");
      if (userSocketId) {
        io.to(userSocketId).emit("receive-message", createdMessage);
      }

      // Load the vector store for the textbook
      const vectorStore = await FaissStore.loadFromPython(
        textbook.vectorStorePath as string,
        new OpenAIEmbeddings()
      );
      console.log("Vector store loaded");

      // Retrieve the chat history between the user and the textbook
      const chatHistoryMessages = await Message.find({
        $or: [
          { sender: sender, receiver: textbook._id },
          { sender: textbook._id, receiver: sender },
        ],
      }).sort({ timeStamp: 1 });
      console.log("Chat history loaded");

      // Convert chat history to BaseMessages
      const chat_history: BaseMessage[] = chatHistoryMessages.map((msg) => {
        if (msg.sender.toString() === sender?.toString()) {
          return new HumanMessage(msg.content as string);
        } else {
          return new AIMessage(msg.content as string);
        }
      });
      console.log("Chat history converted");

      // Set up the OpenAI model
      const llm = new ChatOpenAI({
        model: "gpt-4o",
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
      const retriever = vectorStore.asRetriever();
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
      console.log(chat_history);
      console.log(content);

      // Generate the AI response
      const response = await ragChain.invoke({
        input: content as string,
        chat_history,
      });
      console.log("AI response generated");
      console.log("AI response: ", response);

      // Create and save the AI response message
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

      // Send the AI response back to the user
      if (userSocketId) {
        io.to(userSocketId).emit("receive-message", aiMessage);
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  };

  const disconnect = (socket: Socket) => {
    console.log("disconnected", socket.id);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.query.userId as string;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log("User ID not provided during connection.");
    }

    socket.on("send-message", handleSendMessage);
    socket.on("disconnect", () => disconnect(socket));
  });

  return io;
};

export default setupSocket;
