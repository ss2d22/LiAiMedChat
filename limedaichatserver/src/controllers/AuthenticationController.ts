import { Request, Response } from "express";
import User from "@/models/Usermodel";
import { Secret, sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createJWT = (email: Email, id: ID) => {
  const expiry = 260000000;
  return sign({ email, id }, process.env.JWT_ENCRYPTION_KEY as Secret, {
    expiresIn: expiry,
  });
};

export const signUp = async (request: Request, response: Response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("需要电子邮件和密码");
    }
    const user = await User.create({ email, password });
  } catch (error) {
    console.error(error);
    return response.status(500).send("服务器内部错误");
  }
};
