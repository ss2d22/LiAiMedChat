import e from "express";
import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";
import { Schema } from "mongoose";

/**
 * type for Email
 * @author Sriram Sundar
 *
 * @typedef {Email}
 */
declare type Email = string;
/**
 * type for ID
 * @author Sriram Sundar
 *
 * @typedef {ID}
 */
declare type ID = string;

/**
 * type for request that extends express request to add needed parameters
 * @author Sriram Sundar
 *
 * @interface Request
 * @typedef {Request}
 * @extends {e.Request}
 */
declare interface Request extends e.Request {
  /**
   * request body that contains email, password and userId
   * @author Sriram Sundar
   *
   * @type {{
   *     email: Email;
   *     password: string;
   *     userId?: string;
   *     firstName?: string;
   *     lastName?: string;
   *     avatar?: string;
   *     theme?: number;
   *   }}
   */
  body: {
    email: Email;
    password: string;
    userId?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    theme?: number;
    textbook?: string;
  };
}

/**
 * User Schema for the mongoDb model for the user collection
 * @author Sriram Sundar
 *
 * @interface IUserSchema
 * @typedef {IUserSchema}
 * @extends {Document}
 */
declare interface IUserSchema extends Document {
  /**
   * email of the user, unique and required field
   * @author Sriram Sundar
   *
   * @type {string}
   */
  email: string;
  /**
   * username of the user
   * @author Sriram Sundar
   *
   * @type {?string}
   */
  username?: string;
  /**
   * password of the user
   * @author Sriram Sundar
   *
   * @type {string}
   */
  password: string;
  /**
   * firstName of the user
   * @author Sriram Sundar
   *
   * @type {?string}
   */
  firstName?: string;
  /**
   * lastname of the user
   * @author Sriram Sundar
   *
   * @type {?string}
   */
  lastName?: string;
  /**
   * user's profile pic avatar
   * @author Sriram Sundar
   *
   * @type {?string}
   */
  avatar?: string;
  /**
   * colorscheme preference of the user
   * @author Sriram Sundar
   *
   * @type {?number}
   */
  theme?: number;
  /**
   * profile configuration status of the user
   * @author Sriram Sundar
   *
   * @type {boolean}
   */
  configuredProfile: boolean;
}

/**
 * JWTPayload extended to have if of the user as a string
 * @author Sriram Sundar
 *
 * @interface JwtPayload
 * @typedef {JwtPayload}
 * @extends {JwtPayload}
 */
declare interface JwtPayload extends JwtPayload {
  /**
   * id of the user
   * @author Sriram Sundar
   *
   * @type {string}
   */
  id: string;
}

/**
 * Message Schema for the mongoDb model for the message collection
 * @author Sriram Sundar
 *
 * @interface IMessage
 * @typedef {IMessage}
 * @extends {Document}
 */
interface IMessage extends Document {
  /**
   * sender of the message, required field of type ObjectId
   * @author Sriram Sundar
   *
   * @type {mongoose.Types.ObjectId}
   */
  sender: mongoose.Types.ObjectId;
  /**
   * textbook user is chatting with, required field of type ObjectId ()
   * @author Sriram Sundar
   *
   * @type {mongoose.Types.ObjectId}
   */
  reciever: mongoose.Types.ObjectId;
  /**
   * type of message, required field of type string with enum
   * values text and file
   * @author Sriram Sundar
   *
   * @type {("text" | "file")}
   */
  messageType: "text" | "file";
  /**
   * content of the message, required field if messageType is text of type string
   * @author Sriram Sundar
   *
   * @type {?string}
   */
  content?: string;
  /**
   * file of the message, required field if messageType is file of type string
   * @author Sriram Sundar
   *
   * @type {?string}
   */
  file?: string;
  /**
   * timestamp of the message, default value is Date.now
   * @author Sriram Sundar
   *
   * @type {Date}
   */
  timeStamp: Date;
}

/**
 * Textbook Schema for the mongoDb model for the textbook collection
 * @author Sriram Sundar
 *
 * @interface ITextbook
 * @typedef {ITextbook}
 * @extends {Document}
 */
interface ITextbook extends Document {
  /**
   * Title of the textbook, required field of type string
   * @author Sriram Sundar
   *
   * @type {string}
   */
  title: string;
  /**
   * Author of the textbook, required field of type string
   * @author Sriram Sundar
   *
   * @type {string}
   */
  author: string;
  /**
   * Description of the textbook, optional field of type string
   * @author Sriram Sundar
   *
   * @type {?string}
   */
  description?: string;
  /**
   * Vector store path of the textbook, required field of type string
   *
   * @type {string | null}
   */
  vectorStorePath: string | null;
  /**
   * Text file path of the textbook, required field of type string
   * @author Sriram Sundar
   *
   * @type {string | null}
   */
  textFilePath: string | null;
}

//TODO: if i dun end up needing to exted this just get rid of it
export interface UserSocketMap extends Map<string, string> {}

//tbd jsdocs low laprop battery
export interface ChatMessage {
  sender: string;
  textbookId: string;
  content: string;
  messageType: "text" | "file";
  file?: string;
}

export interface ChannelMessage {
  channelId: string;
  sender: string;
  content: string;
  messageType: "text" | "file";
  fileUrl?: string;
}

export interface Channel {
  _id: Schema.Types.ObjectId;
  members: Schema.Types.ObjectId[];
  // need to add more fields if i need la
}
