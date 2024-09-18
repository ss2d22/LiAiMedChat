import { Response } from "express";
import User from "@/models/Usermodel";
import dotenv from "dotenv";
import { Request } from "@/types";

dotenv.config();

/**
 * updateProfiles is a controller function that is used to update the user profile information
 * @author Sriram Sundar
 *
 * @async
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 */
export const updateProfile = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { userId, firstName, lastName, theme } = request.body;
    console.log(request.body);

    if (!firstName || !lastName) {
      console.log("in 400");

      return response.status(400).send("名字、姓氏和主题均为必填项");
    }
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName: firstName,
        lastName: lastName,
        theme: theme,
        configuredProfile: true,
      },
      { new: true, runValidators: true }
    );

    if (!userData) {
      return response.status(404).send("错误");
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
