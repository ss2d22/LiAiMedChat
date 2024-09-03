import e from "express";

declare type Email = string;
declare type ID = string;

declare interface Request extends e.Request {
  body: {
    email: Email;
    password: string;
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
