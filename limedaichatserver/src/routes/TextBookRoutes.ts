import { Router } from "express";
import dotenv from "dotenv";
import { verifyJWT } from "@/middlewares/AuthenticationMiddleware";
import { searchTextbooks } from "@/controllers/TextBookController";
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
 *
 *
 *
 */
textbookRoutes.get("/searchtextbooks", verifyJWT, searchTextbooks);

export default textbookRoutes;
