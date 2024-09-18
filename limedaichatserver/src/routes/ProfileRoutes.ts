import { Router } from "express";
import dotenv from "dotenv";
import { verifyJWT } from "@/middlewares/AuthenticationMiddleware";
import { updateProfile } from "@/controllers/ProfileController";
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
 * /api/profile/updateprofile:
 *   patch:
 *     summary: update the user profile information
 *     description: >
 *       The JWT token in the attached cookie is verified by the verifyJWT middleware.
 *       If invalid, an error is returned. If the token is valid, the updateProfile controller
 *       will handle updating the user profile information and return the appropriate
 *       response or error.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *               firstName:
 *                 type: string
 *                 example: "约翰"
 *               lastName:
 *                 type: string
 *                 example: "多伊"
 *               theme:
 *                 type: string
 *                 example: "黑暗"
 *     responses:
 *       200:
 *         description: profile updated successfully
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
 *                       type: string
 *                       example: "黑暗"
 *       400:
 *         description: Bad Request, missing required fields
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "名字、姓氏和主题均为必填项"
 *       401:
 *         description: Unauthorized, JWT token is missing or invalid
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "您未通过身份验证"
 *       403:
 *         description: Access Forbidden, JWT token is invalid/tampered with
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
 *         description: internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "服务器内部错误"
 */
profileRoutes.patch("/updateprofile", verifyJWT, updateProfile);
export default profileRoutes;
