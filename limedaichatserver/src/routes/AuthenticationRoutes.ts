import { Router } from "express";
import dotenv from "dotenv";
import { signUp } from "@/controllers/AuthenticationController";

dotenv.config();

/**
 * authenticationRoutes is an instance of express router that is used to setup authentication routes
 * @author Sriram Sundar
 *
 * @type {Router}
 */
const authenticationRoutes: Router = Router();

authenticationRoutes.post("/signup", signUp);

export default authenticationRoutes;
