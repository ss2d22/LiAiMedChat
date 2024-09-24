import { Router } from "express";
import dotenv from "dotenv";
import { verifyJWT } from "@/middlewares/AuthenticationMiddleware";
import { fetchmessages } from "@/controllers/MessagesController";

dotenv.config();

const MessagesRoutes: Router = Router();

MessagesRoutes.post("/fetchmessages", verifyJWT, fetchmessages);

export default MessagesRoutes;
