import { Router } from "express";
import dotenv from "dotenv";
import { verifyJWT } from "@/middlewares/AuthenticationMiddleware";
import {
  updateProfile,
  updateAvatar,
  deleteAvatar,
} from "@/controllers/ProfileController";
import { uploadImage } from "@/middlewares/ProfileMiddlewares";

dotenv.config();

/**
 * profileRoutes is an instance of express router that is used to setup profile routes
 * @author Sriram Sundar
 *
 * @type {Router}
 */
const profileRoutes: Router = Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *
 *
 * /api/profile/updateprofile:
 *   patch:
 *     summary: Update the user's profile information
 *     description: >
 *       The JWT token in the 'jwt' cookie is verified by the verifyJWT middleware.
 *       If valid, the user's ID is extracted from the token and added to request.body.userId.
 *       The updateProfile controller then updates the user's profile information and returns the updated user data.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "约翰"
 *               lastName:
 *                 type: string
 *                 example: "多伊"
 *               theme:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109ca"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     configuredProfile:
 *                       type: boolean
 *                       example: true
 *                     firstName:
 *                       type: string
 *                       example: "约翰"
 *                     lastName:
 *                       type: string
 *                       example: "多伊"
 *                     avatar:
 *                       type: string
 *                       example: "https://example.com/avatar.jpg"
 *                     theme:
 *                       type: number
 *                       example: 1
 *       400:
 *         description: Bad Request, missing required fields
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "名字、姓氏和主题均为必填项"
 *       401:
 *         description: Unauthorized, JWT cookie is missing
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "您未通过身份验证"
 *       403:
 *         description: Forbidden, JWT token is invalid
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "无效的令牌"
 *       404:
 *         description: User not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "错误"
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "服务器内部错误"
 */

profileRoutes.patch("/updateprofile", verifyJWT, updateProfile);

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *
 * /api/profile/updateavatar:
 *   patch:
 *     summary: Update the user's avatar image
 *     description: >
 *       The JWT token in the 'jwt' cookie is verified by the verifyJWT middleware.
 *       If valid, the user's ID is extracted from the token and added to request.body.userId.
 *       The uploadImage middleware then handles the file upload.
 *       Finally, the updateAvatar controller updates the user's avatar and returns the response.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatar:
 *                   type: string
 *                   example: "src/assets/uploads/avatars/1726702800641EcoNex_A10.jpg"
 *       400:
 *         description: Bad Request, no file uploaded
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "需要上传图片"
 *       401:
 *         description: Unauthorized, JWT cookie is missing
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "您未通过身份验证"
 *       403:
 *         description: Forbidden, JWT token is invalid
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "无效的令牌"
 *       404:
 *         description: User not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "未找到用户"
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "服务器内部错误"
 */
profileRoutes.patch("/updateavatar", verifyJWT, uploadImage, updateAvatar);

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *
 * /api/profile/deleteavatar:
 *   delete:
 *     summary: Delete the user's avatar image
 *     description: >
 *       The JWT token in the 'jwt' cookie is verified by the verifyJWT middleware.
 *       If valid, the user's ID is extracted from the token and added to request.body.userId.
 *       The deleteAvatar controller then handles deleting the user's avatar and returns the response.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Avatar deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "用户头像删除成功"
 *                 deleted:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized, JWT cookie is missing
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "您未通过身份验证"
 *       403:
 *         description: Forbidden, JWT token is invalid
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "无效的令牌"
 *       404:
 *         description: User not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "未找到用户错误"
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "服务器内部错误"
 */
profileRoutes.delete("/deleteavatar", verifyJWT, deleteAvatar);

export default profileRoutes;
