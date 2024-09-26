import Message from "@/models/MessageSchema";
import { Types } from "mongoose";
import { Document } from "langchain/document";
import { cleanText, splitTextIntoChunks } from "@/utils/textUtils";
import { Server as SocketIOServer } from "socket.io";

/**
 * Create and emit an AI message to the user.
 * @author Sriram Sundar
 *
 * @async
 * @param io - The Socket.IO server instance.
 * @param userSocketId - The socket ID of the user.
 * @param senderId - The ObjectId of the sender (Textbook).
 * @param receiverId - The ObjectId of the receiver (User).
 * @param content - The content of the message.
 */
export const createAndEmitMessage = async (
  io: SocketIOServer,
  userSocketId: string,
  senderId: Types.ObjectId,
  receiverId: Types.ObjectId,
  content: string,
  isContextMessage: boolean = false
) => {
  const message = await Message.create({
    sender: senderId,
    receiver: receiverId,
    senderModel: "Textbook",
    receiverModel: "User",
    isAI: true,
    messageType: isContextMessage ? "context" : "text",
    content,
    timeStamp: new Date(),
  });

  if (userSocketId) {
    io.to(userSocketId).emit("receive-message", message);
  }
};

/**
 * Handle sending context documents as messages.
 * @author Sriram Sundar
 *
 * @async
 * @param io - The Socket.IO server instance.
 * @param userSocketId - The socket ID of the user.
 * @param senderId - The ObjectId of the sender (Textbook).
 * @param receiverId - The ObjectId of the receiver (User).
 * @param contextDocuments - The retrieved context documents.
 */
export const handleContextMessages = async (
  io: SocketIOServer,
  userSocketId: string,
  senderId: Types.ObjectId,
  receiverId: Types.ObjectId,
  contextDocuments: Document[]
) => {
  const maxMessageLength = 1000;
  for (let i = 0; i < contextDocuments.length; i++) {
    const doc = contextDocuments[i];
    const cleanedPageContent = cleanText(doc.pageContent);
    const messageHeader = `【片段${i + 1}】\n`;
    const contentChunks = splitTextIntoChunks(
      cleanedPageContent,
      maxMessageLength - messageHeader.length
    );
    let isFirstChunk = true;

    for (const chunk of contentChunks) {
      const chunkContent = (isFirstChunk ? messageHeader : "") + chunk;
      isFirstChunk = false;

      await createAndEmitMessage(
        io,
        userSocketId,
        senderId,
        receiverId,
        chunkContent,
        true
      );
    }
  }
};
