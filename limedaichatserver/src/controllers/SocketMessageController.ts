import { IMessage, UserSocketMap } from "@/types";
import { Server as SocketIOServer } from "socket.io";
import Message from "@/models/MessageSchema";
import Textbook from "@/models/Textbookmodel";
import aiService from "@/services/AiService";

/**
 * Handles incoming messages from users and processes AI responses.
 *
 * @author Sriram Sundar
 *
 * @async
 * @param io - The Socket.IO server instance.
 * @param userSocketMap - A map of user IDs to socket IDs.
 * @param message - The incoming message object.
 * @returns {Promise<void>}
 */
export const handleSendMessage = async (
  io: SocketIOServer,
  userSocketMap: UserSocketMap,
  message: Partial<IMessage>
): Promise<void> => {
  console.log("Received message: ", message);
  const { sender, content, receiver, receiverModel, isAI, messageType } =
    message;

  try {
    console.log("Receiver ID: ", receiver);

    const textbook = await Textbook.findById(receiver);
    if (!textbook) {
      throw new Error("Textbook not found");
    }

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

    const userSocketId = userSocketMap.get(sender?.toString() || "");
    if (userSocketId) {
      io.to(userSocketId).emit("receive-message", createdMessage);
    }

    await aiService.handleAIResponse(
      io,
      userSocketMap,
      sender,
      textbook,
      content as string
    );
  } catch (error) {
    console.error("Error handling message:", error);
  }
};
