import { Request, Response } from "express";


export const signUp = async (request: Request, response: Response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("需要电子邮件和密码");
    }


  } catch (error) {
    console.error(error);
    return response.status(500).send("服务器内部错误");
  }
};
