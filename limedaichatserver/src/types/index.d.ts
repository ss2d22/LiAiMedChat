import e from "express";
import { JwtPayload } from "jsonwebtoken";

declare type Email = string;
declare type ID = string;

declare interface Request extends e.Request {
  body: {
    email: Email;
    password: string;
    userId: string;
  };
}

declare interface IUserSchema extends Document {
  email: string;
  username?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  theme?: number;
  configuredProfile: boolean;
}

declare interface JwtPayload extends JwtPayload {
  id: string;
}
