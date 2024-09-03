import { Router } from "express";
import dotenv from "dotenv";
import { signUp } from "@/controllers/AuthenticationController";
dotenv.config();

const authenticationRoutes = Router();

authenticationRoutes.post("/signup", signUp);

export default authenticationRoutes;
