import { Response } from "express";
import User from "@/models/Usermodel";
import { Secret, sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Email, ID } from "@/types";
import { compare } from "bcrypt";

dotenv.config();

/**
 * expiry time for jwt token in milliseconds
 * @author Sriram Sundar
 *
 * @type {number}
 */
const expiry: number = 260000000;

/**
 * create a jwt token for the user with email and id as payload with expiry time of const above
 * @author Sriram Sundar
 *
 * @param {Email} email
 * @param {ID} id
 * @returns {string} jwt
 */
const createJWT = (email: Email, id: ID): string => {
  return sign({ email, id }, process.env.JWT_ENCRYPTION_KEY as Secret, {
    expiresIn: expiry,
  });
};

/**
 * Handles sign up of a user with email and , throws error if email or password is not provided,
 * creates a user with email and password and returns the user with jwt token in cookie and user
 * object in response body, throws error if any error occurs while creating user or setting cookie,
 * returns 500 status code if any error occurs while creating user or setting cookie, returns 400
 * status code if email or password is not provided in request body, returns 201 status code if user
 * is created successfully and jwt token is set in cookie and user object is returned in response body
 * with user id, email and configuredProfile, throws error if any error occurs while creating user or
 * setting cookie, returns 500 status code if any error occurs while creating user or setting cookie,
 * returns 400 status code if email or password is not provided in request body, returns 201 status
 * code if user is created successfully and jwt token is set in cookie and user object is returned in
 * response body with user id, email and configuredProfile
 * @author Sriram Sundar
 *
 * @async
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>} response with user object in response body and jwt token in cookie if user is succesfully created, 500 status code if any error occurs while creating user or setting cookie, 400 status code if email or password is not provided in request body
 */
export const signUp = async (
  request: Request,
  response: Response
): Promise<Response> => {
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
      },
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send("服务器内部错误");
  }
};

/**
 * Handles sign in of users and if email or password is not provided returns 400 status code,
 * if user is not found with email returns 400 status code,
 * if password is incorrect returns 400 status code,
 * if any error occurs while comparing password returns 500 status code,
 * if user is found with email and password is correct sets jwt token in cookie and returns
 * user object in response body with user id, email and configuredProfile,
 * if any error occurs while comparing password returns 500 status code
 * @author Sriram Sundar
 *
 * @async
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 */
export const signIn = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      console.log("no email or pass");

      return response.status(400).send("需要电子邮件和密码");
    }
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return response.status(400).send("未找到电子邮件");
    }

    const auth = await compare(password, user.password);
    if (!auth) {
      console.log("pass fail");

      return response.status(400).send("密码错误");
    }
    response.cookie("jwt", createJWT(email, user.id), {
      maxAge: expiry,
      secure: true,
      sameSite: "none",
    });
    return response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        configuredProfile: user.configuredProfile,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        theme: user.theme,
      },
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send("服务器内部错误");
  }
};

/**
 * fetches user info from database (only to be used in conjunction with the jwt verification middleware)
 * handles cases where user is not found with a status code 404, 500 for internal server error and status
 * code 200 for user found
 *
 * @author Sriram Sundar
 *
 * @async
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 */

export const fetchUserInfo = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const userData = await User.findById(request.body.userId);
    if (!userData) {
      return response.status(404).send("未找到用户");
    }

    return response.status(200).json({
      user: {
        id: userData.id,
        email: userData.email,
        configuredProfile: userData.configuredProfile,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar,
        theme: userData.theme,
      },
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send("服务器内部错误");
  }
};

export const signOut = async (request: Request, response: Response) => {
  try {
    response.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "none" });
    response.status(200).json({
      message: "注销成功",
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send("服务器内部错误");
  }
};
