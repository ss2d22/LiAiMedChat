import { Response } from "express";
import User from "@/models/Usermodel";
import { Secret, sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Email, ID } from "@/types";

dotenv.config();

const expiry: number = 260000000;

const createJWT = (email: Email, id: ID) => {
  return sign({ email, id }, process.env.JWT_ENCRYPTION_KEY as Secret, {
    expiresIn: expiry,
  });
};

export const signUp = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("需要电子邮件和密码");
    }
    const user = await User.create({ email, password });
    response.cookie("jwt", createJWT(email, user.id), {
      maxAge: expiry,
      secure: true,
      sameSite: "none",
    });
    return response.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        configuredProfile: user.configuredProfile,
        //not set up initially will add logic later, TODO
        // firstName: user.firstName,
        // lastName: user.lastName,
        // avatar: user.avatar,
        // theme: user.theme,
      },
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send("服务器内部错误");
  }
};
