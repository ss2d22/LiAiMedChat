import { Router } from "express";
import dotenv from "dotenv";
import {
  fetchUserInfo,
  signIn,
  signUp,
} from "@/controllers/AuthenticationController";
import { veriftJWT } from "@/middlewares/AuthenticationMiddleware";

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
 @swagger
 
 /api/authentication/fetchusers

  post:
    summary: fetch user info after verifying jwt token
    description: the jwt token in the attched cookie is verified by verifyJWT middleware and if it is not valid an error is returned
    if the token is valid the fetchUserInfo controller handles the fetching of unser information with the appropriate responses

    requestBody:
    required: true

    content:
      application/json:
        schema:
          type:

          tbd i shall do the documentation after i finish integrating with frontend and testing
 */
authenticationRoutes.post("/fetchuserinfo", veriftJWT, fetchUserInfo);

export default authenticationRoutes;
