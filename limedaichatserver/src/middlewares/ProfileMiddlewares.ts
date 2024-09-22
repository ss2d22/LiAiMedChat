import { NextFunction, Response } from "express";
import dotenv from "dotenv";
import { Request } from "@/types";
import multer, { Multer } from "multer";

dotenv.config();

/**
 * used to upload files to the server
 * @author Sriram Sundar
 *
 * @type {Multer}
 */
const uploader: Multer = multer({ dest: "./src/assets/uploads/avatars" });

export const uploadImage = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response<string> => {
  const id = request.body.userId;

  const upload = uploader.single("avatar");

  upload(request, response, (err) => {

    if (err) {
      console.error(err);
      return response.status(400).send("文件上传失败");
    }

    if (!request.file) {

      return response.status(400).send("没有文件被上传");
    }

    request.body.userId = id;
    const userId = request.body.userId;
    if (!userId) {
      return response.status(400).send("用户ID不存在");
    }

    next();
  });
};
