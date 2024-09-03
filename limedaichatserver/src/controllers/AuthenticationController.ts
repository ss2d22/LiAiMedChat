import { Request, Response } from "express";

export const signUp = async (request: Request, response: Response, next) => {
  try {
  } catch (error) {
    console.error(error);
    return response.status(500).send("internal server error");
  }
};
