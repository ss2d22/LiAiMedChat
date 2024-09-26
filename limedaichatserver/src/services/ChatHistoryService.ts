import Message from "@/models/MessageSchema";
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { Types } from "mongoose";

/**
 * Fetch and format chat history messages.
 * @author Sriram Sundar
 *
 * @async
 * @param sender - The sender's ObjectId.
 * @param textbookId - The textbook's ObjectId.
 * @returns {Promise<BaseMessage[]>} An array of formatted chat history messages.
 */
export const getChatHistory = async (
  sender: Types.ObjectId,
  textbookId: Types.ObjectId
): Promise<BaseMessage[]> => {
  const chatHistoryMessages = await Message.find({
    $or: [
      { sender: sender, receiver: textbookId },
      { sender: textbookId, receiver: sender },
    ],
    messageType: { $ne: "context" },
  })
    .sort({ timeStamp: -1 })
    .limit(10);

  return chatHistoryMessages.reverse().map((msg) => {
    if (msg.sender.toString() === sender.toString()) {
      return new HumanMessage(msg.content as string);
    } else {
      return new AIMessage(msg.content as string);
    }
  });
};
