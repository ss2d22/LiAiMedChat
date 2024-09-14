import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { Request } from "@/types";

/**
 * middleware to verify jwt token sent is valid , to be used in conjunction with the fetcUserinfo
 * method to ensure the JWTs sent are valid for security reasons
 *
 * @author Sriram Sundar
 *
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 * @returns {Response<string>}
 */

export const veriftJWT = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response<string> => {
  const token = request.cookies.jwt;
  if (!token) return response.status(401).send("您未通过身份验证");
  //TODO: add types so that typescript and eslint are happy
  jwt.verify(token, process.env.JWT_KEY as string, async (err, payload) => {
    if (err) return response.status(403).send("");
    request.body.userId = payload.userId;

    next();
  });
};
