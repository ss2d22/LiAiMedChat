import { Router } from "express";
import dotenv from "dotenv";
import {
  fetchUserInfo,
  signIn,
  signUp,
} from "@/controllers/AuthenticationController";
import { verifyJWT } from "@/middlewares/AuthenticationMiddleware";

dotenv.config();

/**
 * authenticationRoutes is an instance of express router that is used to setup authentication routes
 * @author Sriram Sundar
 *
 * @type {Router}
 */
const authenticationRoutes: Router = Router();

/**
 * @swagger
 * /api/authentication/signup:
 *   post:
 *     summary: User signup
 *     description: >
 *       This endpoint allows a new user to sign up by providing their email, password, and other optional profile information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "用户@example.com"
 *               password:
 *                 type: string
 *                 example: "密码123"
 *               firstName:
 *                 type: string
 *                 example: "约翰"
 *               lastName:
 *                 type: string
 *                 example: "多伊"
 *     responses:
 *       201:
 *         description: User created successfully
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
 *                       example: "用户@example.com"
 *                     firstName:
 *                       type: string
 *                       example: "约翰"
 *                     lastName:
 *                       type: string
 *                       example: "多伊"
 *       400:
 *         description: Bad Request, missing required fields or invalid data
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "请求无效，缺少必填字段或数据无效"
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "服务器内部错误"
 */
authenticationRoutes.post("/signup", signUp);

/**
 * @swagger
 * /api/authentication/signin:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates the user with the provided email and password. Returns user details and a JWT token in a cookie upon successful login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "用户@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "安全密码123"
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "613b6c5a5f1b2c001f13d788"
 *                 email:
 *                   type: string
 *                   example: "用户@example.com"
 *                 configuredProfile:
 *                   type: boolean
 *                   example: true
 *                 firstName:
 *                   type: string
 *                   example: "约翰"
 *                 lastName:
 *                   type: string
 *                   example: "多伊"
 *                 avatar:
 *                   type: string
 *                   example: "https://avatar.url"
 *                 theme:
 *                   type: number
 *                   example: 0
 *       400:
 *         description: Bad Request - Invalid email or password
 *         content:
 *           text/plain:
 *             example: "无效的电子邮件或密码"
 *       500:
 *         description: Internal Server Error - Authentication failed
 *         content:
 *           text/plain:
 *             example: "服务器内部错误"
 */
authenticationRoutes.post("/signin", signIn);

/**
 * @swagger
 * /api/authentication/fetchuserinfo:
 *   get:
 *     summary: Fetch user info after verifying JWT token
 *     description: >
 *       The JWT token in the attached cookie is verified by the verifyJWT middleware.
 *       If invalid, an error is returned. If the token is valid, the fetchUserInfo controller
 *       will handle fetching the user information and return the appropriate response or error.
 *     responses:
 *       200:
 *         description: Successfully fetched user information
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
 *                       example: "用户@example.com"
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
 *       401:
 *         description: Unauthorized, JWT token is missing or invalid
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
 *               example: "未找到电子邮件"
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "服务器内部错误"
 */
authenticationRoutes.get("/fetchuserinfo", verifyJWT, fetchUserInfo);

export default authenticationRoutes;
