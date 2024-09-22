import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { Request } from "@/types";
import dotenv from "dotenv";

dotenv.config();

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

export const verifyJWT = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response<string> => {

  const token = request.cookies.jwt;
  if (!token) return response.status(401).send("您未通过身份验证");
  jwt.verify(
    token,
    process.env.JWT_ENCRYPTION_KEY as string,
    async (
      err: VerifyErrors | null,
      payload: string | JwtPayload | undefined
    ) => {
      if (err) {
        console.log(err);
        response.status(403).send("无效的令牌");
      } else {
        if (payload && typeof payload !== "string") {

          request.body.userId = (payload as JwtPayload).id;
        }
        next();
      }
    }
  );
};
