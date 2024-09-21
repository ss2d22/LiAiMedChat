import e from "express";
import { JwtPayload } from "jsonwebtoken";
import {Document} from "mongoose"

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
