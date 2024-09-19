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
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         email:
 *           type: string
 *           format: email
 *           example: "用户@example.com"
 *         configuredProfile:
 *           type: boolean
 *           example: false
 *
 * /api/authentication/signup:
 *   post:
 *     summary: Register a new user
 *     description: >
 *       Creates a new user account with the provided email and password.
 *       On successful registration, it sets a JWT cookie for authentication
 *       and returns the user's basic information.
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
 *                 example: "强密码123"
 *     responses:
 *       201:
 *         description: User successfully created
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: jwt=abcde12345; Path=/; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - email or password missing
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "需要电子邮件和密码"
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
 * components:
 *   schemas:
 *     UserDetailed:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         email:
 *           type: string
 *           format: email
 *           example: "用户@example.com"
 *         configuredProfile:
 *           type: boolean
 *           example: true
 *         firstName:
 *           type: string
 *           example: "张"
 *         lastName:
 *           type: string
 *           example: "三"
 *         avatar:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 *         theme:
 *           type: number
 *           example: 1
 *
 * /api/authentication/signin:
 *   post:
 *     summary: Authenticate a user and retrieve their information
 *     description: >
 *       Authenticates a user with the provided email and password.
 *       On successful authentication, it sets a JWT cookie for session management
 *       and returns the user's detailed information.
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
 *                 example: "密码123"
 *     responses:
 *       200:
 *         description: User successfully authenticated
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: jwt=abcde12345; Path=/; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserDetailed'
 *       400:
 *         description: Bad request - email or password missing, or authentication failed
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "需要电子邮件和密码"
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "服务器内部错误"
 */
authenticationRoutes.post("/signin", signIn);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: jwt
 *   schemas:
 *     UserDetailed:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         email:
 *           type: string
 *           format: email
 *           example: "用户@example.com"
 *         configuredProfile:
 *           type: boolean
 *           example: true
 *         firstName:
 *           type: string
 *           example: "张"
 *         lastName:
 *           type: string
 *           example: "三"
 *         avatar:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 *         theme:
 *           type: number
 *           example: 1
 *
 * /api/authentication/fetchuserinfo:
 *   get:
 *     summary: Fetch authenticated user's information
 *     description: >
 *       Retrieves detailed information for the currently authenticated user.
 *       This endpoint requires a valid JWT token in the cookie for authentication.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User information successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserDetailed'
 *       401:
 *         description: Unauthorized - No valid JWT token provided
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "您未通过身份验证"
 *       403:
 *         description: Forbidden - Invalid JWT token
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
authenticationRoutes.get("/fetchuserinfo", verifyJWT, fetchUserInfo);

export default authenticationRoutes;
