import { Response } from "express";
import User from "@/models/Usermodel";
import dotenv from "dotenv";
import { Request } from "@/types";
import { renameSync, unlinkSync } from "fs";

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

/**
 * updateAvatar is a controller function that is used to update the user avatar image
 * @author Sriram Sundar
 *
 * @async
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 */
export const updateAvatar = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { userId } = request.body;
    console.log(request.body);

    if (!request.file) {
      return response.status(400).send("需要上传图片");
    }

    const currDate = Date.now();
    const fileName =
      "src/assets/uploads/avatars/" + currDate + request.file.originalname;
    renameSync(request.file.path, fileName);

    const userData = await User.findByIdAndUpdate(
      userId,
      { avatar: fileName },
      { new: true, runValidators: true }
    );

    console.log(userData);

    if (!userData) {
      console.log("in 404");

      return response.status(404).send("未找到用户");
    }

    return response.status(200).json({
      avatar: userData.avatar,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send("服务器内部错误");
  }
};

/**
 * deleteAvatar is a controller function that is used to delete the user avatar image
 * @author Sriram Sundar
 *
 * @async
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 */
export const deleteAvatar = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { userId } = request.body;
    console.log(request.body);

    const userData = await User.findById(userId);
    if (!userData) {
      console.log("in 404");
      return response.status(404).send("未找到用户错误");
    }

    if (userData.avatar) {
      unlinkSync(userData.avatar);
    }

    userData.avatar = undefined;

    await userData.save();

    return response.status(200).json({
      message: "",
      deleted: true,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send("服务器内部错误");
  }
};
