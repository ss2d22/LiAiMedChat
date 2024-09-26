import { Response } from "express";
import Message from "@/models/MessageSchema";
import { Types } from "mongoose";
import { Request } from "@/types";

/**
 * Fetches messages between a user and a textbook.
 * @author Sriram Sundar
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchmessages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log(req.body);

    const userId = req.body.userId as string;
    const receiverId = req.body.textbookId as string;
    const receiverModel = req.body.receiverModel as string;

    if (!userId || !receiverId || !receiverModel) {
      console.log("error");
      return res.status(400).json({
        error: "需要用户 ID、接收器 ID 和接收器型号。",
      });
    }

    if (!["User", "Textbook"].includes(receiverModel)) {
      console.log("model error");
      return res.status(400).json({ error: "接收器型号无效。" });
    }

    const senderId = new Types.ObjectId(userId);
    const textbookId = new Types.ObjectId(receiverId);

    const messages = await Message.find({
      $or: [
        {
          sender: senderId,
          receiver: textbookId,
          senderModel: "User",
          receiverModel,
        },
        {
          sender: textbookId,
          receiver: senderId,
          senderModel: receiverModel,
          receiverModel: "User",
        },
      ],
    }).sort({ timeStamp: 1 });

    return res.status(200).json({ messages });
  } catch (err) {
    console.error(err);
    return res.status(500).send("内部服务器错误");
  }
};
