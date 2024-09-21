import Textbook from "@/models/Textbookmodel";
import { Request } from "@/types";
import { Response } from "express";

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
