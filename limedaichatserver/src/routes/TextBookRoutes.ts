import { Router } from "express";
import dotenv from "dotenv";
import { verifyJWT } from "@/middlewares/AuthenticationMiddleware";
import {
  getAllTextbooks,
  getTextbooksForList,
  searchTextbooks,
} from "@/controllers/TextBookController";
dotenv.config();

/**
 * textbookRoutes is an instance of express router for
 * endpoints related to textbooks at the /api/textbooks route
 * @author Sriram Sundar
 *
 * @type {Router}
 */
const textbookRoutes: Router = Router();

/**
 * @swagger
 * /api/textbooks/searchtextbooks:
 *   post:
 *     summary: Search for textbooks
 *     description: >
 *       Searches for textbooks based on the provided query. The search is performed
 *       on the title, author, and description fields. This endpoint requires JWT
 *       authentication. Sensitive information is removed from the response.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - textbook
 *             properties:
 *               textbook:
 *                 type: string
 *                 description: The search query for textbooks
 *                 example: "计算机科学"
 *     responses:
 *       200:
 *         description: Successfully retrieved matching textbooks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 textbooks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d21b4667d0d8992e610c85"
 *                       title:
 *                         type: string
 *                         example: "计算机科学导论"
 *                       author:
 *                         type: string
 *                         example: "张三"
 *                       description:
 *                         type: string
 *                         example: "这是一本关于计算机科学基础的全面指南"
 *       400:
 *         description: Bad request - textbook query is missing
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "需要教科书来搜索"
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
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "服务器内部错误"
 */
textbookRoutes.post("/searchtextbooks", verifyJWT, searchTextbooks);

/**
 * @swagger
 * /api/textbooks/gettextbooksforlist:
 *   get:
 *     summary: Get textbooks for user's list
 *     description: >
 *       Retrieves the list of textbooks that the authenticated user has interacted with,
 *       sorted by the last message time. This endpoint requires JWT authentication.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved textbooks for the user's list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 textbooks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d21b4667d0d8992e610c85"
 *                       lastMessageTime:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-10-05T14:48:00.000Z"
 *                       title:
 *                         type: string
 *                         example: "计算机科学导论"
 *                       author:
 *                         type: string
 *                         example: "李四"
 *       400:
 *         description: Bad request - User ID is required
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "需要用户ID"
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
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "服务器内部错误"
 */
textbookRoutes.get("/gettextbooksforlist", verifyJWT, getTextbooksForList);

/**
 * @swagger
 * /api/textbooks/getalltextbooks:
 *   get:
 *     summary: Get all textbooks
 *     description: >
 *       Retrieves a list of all textbooks with basic information. This endpoint requires JWT authentication.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all textbooks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 textbooks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 *                         example: "计算机科学导论 by 张三"
 *                       value:
 *                         type: string
 *                         example: "60d21b4667d0d8992e610c85"
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
 *               schema:
 *                 type: string
 *                 example: "无效的令牌"
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *               schema:
 *                 type: string
 *                 example: "服务器内部错误"
 */
textbookRoutes.get("/getalltextbooks", verifyJWT, getAllTextbooks);

export default textbookRoutes;
