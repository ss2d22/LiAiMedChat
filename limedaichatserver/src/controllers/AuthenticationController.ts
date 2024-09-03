import { Response } from "express";
import User from "@/models/Usermodel";
import { Secret, sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Email, ID } from "@/types";

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
 * Handles sign up of a user with email and , throws error if email or password is not provided, creates a user with email and password and returns the user with jwt token in cookie and user object in response body, throws error if any error occurs while creating user or setting cookie, returns 500 status code if any error occurs while creating user or setting cookie, returns 400 status code if email or password is not provided in request body, returns 201 status code if user is created successfully and jwt token is set in cookie and user object is returned in response body with user id, email and configuredProfile, throws error if any error occurs while creating user or setting cookie, returns 500 status code if any error occurs while creating user or setting cookie, returns 400 status code if email or password is not provided in request body, returns 201 status code if user is created successfully and jwt token is set in cookie and user object is returned in response body with user id, email and configuredProfile
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
