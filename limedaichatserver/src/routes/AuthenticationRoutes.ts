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

   *     summary: Register a new user

   *     description: Creates a new user account using the provided email and password. Returns the user's details and a JWT in a secure cookie.

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

   *                 example: "user@example.com"

   *               password:

   *                 type: string

   *                 format: password

   *                 example: "securePassword123"

   *     responses:

   *       201:

   *         description: User created successfully

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

   *                   example: "user@example.com"

   *                 configuredProfile:

   *                   type: boolean

   *                   example: false

   *       400:

   *         description: Bad Request - Email or password not provided

   *         content:

   *           text/plain:

   *             example: "Email and password are required"

   *       500:

   *         description: Internal Server Error - Could not create user or set cookie

   *         content:

   *           text/plain:

   *             example: "Internal Server Error"
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

   *                 example: "user@example.com"

   *               password:

   *                 type: string

   *                 format: password

   *                 example: "securePassword123"

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

   *                   example: "user@example.com"

   *                 configuredProfile:

   *                   type: boolean

   *                   example: true

   *                 firstName:

   *                   type: string

   *                   example: "John"

   *                 lastName:

   *                   type: string

   *                   example: "Doe"

   *                 avatar:

   *                   type: string

   *                   example: "https://avatar.url"

   *                 theme:

   *                   type: string

   *                   example: "dark"

   *       400:

   *         description: Bad Request - Invalid email or password

   *         content:

   *           text/plain:

   *             example: "Invalid email or password"

   *       500:

   *         description: Internal Server Error - Authentication failed

   *         content:

   *           text/plain:

   *             example: "Internal Server Error"
 */
authenticationRoutes.post("/signin", signIn);

/**
 * @swagger
 * /api/authentication/fetchuserinfo:
 *   get:
 *     summary: Fetch user info after verifying JWT token
 *     description: The JWT token in the attached cookie is verified by verifyJWT middleware.
 *     If it is not valid, an error is returned. If the token is valid, the fetchUserInfo controller handles the
 *     fetching of user information with the appropriate responses using the userid from the cookie.
 *
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
 *                       example: "user@example.com"
 *                     configuredProfile:
 *                       type: boolean
 *                       example: true
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     avatar:
 *                       type: string
 *                       example: "https://example.com/avatar.jpg"
 *                     theme:
 *                       type: string
 *                       example: "dark"
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
