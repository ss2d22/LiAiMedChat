import Message from "@/models/MessageSchema";
import Textbook from "@/models/Textbookmodel";
import { Request } from "@/types";
import { Response } from "express";
import { Types } from "mongoose";

/**
 * function to clean up the inputs before using regex
 * it escapes all special characters
 * @author Sriram Sundar
 *
 * @param {string} word
 * @returns {string}
 */
const escapeSpecialChars = (word: string): string => {
  return word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/**
 * controller to search for a specific textbook from the database of textbooks
 * can use author name, book name or description to search
 * @author Sriram Sundar
 *
 * @async
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 */
export const searchTextbooks = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { textbook } = request.body;

    if (textbook === undefined || textbook === null) {
      return response.status(400).send("需要教科书来搜索");
    }

    const cleanedTextbook = escapeSpecialChars(textbook);

    const regex = new RegExp(cleanedTextbook, "i");

    const textbooks = await Textbook.find({
      $or: [{ title: regex }, { description: regex }, { author: regex }],
    });

    textbooks.forEach((textbook) => {
      textbook.vectorStorePath = null;
      textbook.textFilePath = null;
    });
    return response.status(200).json({
      textbooks: textbooks,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send("服务器内部错误");
  }
};

/**
 * Controller to get all textbooks in the system.
 * @author Sriram Sundar
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getAllTextbooks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const textbooks = await Textbook.find({}, "title author _id");

    const textbookList = textbooks.map((textbook) => ({
      label: `${textbook.title} by ${textbook.author}`,
      value: textbook._id,
    }));

    return res.status(200).json({ textbooks: textbookList });
  } catch (error) {
    console.error({ error });
    return res.status(500).send("服务器内部错误");
  }
};

/**
 * Controller to get the list of textbooks the user has interacted with, sorted by last message time.
 * @author Sriram Sundar
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getTextbooksForList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.body.userId as string;
    const userObjectId = new Types.ObjectId(userId);

    if (!userObjectId) {
      return res.status(400).send("User ID is required.");
    }

    const textbooks = await Message.aggregate([
      {
        $match: {
          $or: [
            {
              sender: userObjectId,
              senderModel: "User",
              receiverModel: "Textbook",
            },
            {
              receiver: userObjectId,
              receiverModel: "User",
              senderModel: "Textbook",
            },
          ],
        },
      },
      {
        $sort: { timeStamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$senderModel", "Textbook"] },
              then: "$sender",
              else: "$receiver",
            },
          },
          lastMessageTime: { $first: "$timeStamp" },
        },
      },
      {
        $lookup: {
          from: "textbooks",
          localField: "_id",
          foreignField: "_id",
          as: "textbookInfo",
        },
      },
      {
        $unwind: "$textbookInfo",
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          title: "$textbookInfo.title",
          author: "$textbookInfo.author",
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);

    return res.status(200).json({ textbooks });
  } catch (error) {
    console.error("Error getting textbooks for list:", error);
    return res.status(500).send("服务器内部错误");
  }
};
