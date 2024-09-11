import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authenticationRoutes from "@/routes/AuthenticationRoutes";
import morgan from "morgan";

// setup server
dotenv.config();
/**
 * app is an instance of express that we will use to setup our server and routes
 * @author Sriram Sundar
 *
 * @type {express.Application}
 */
const app: express.Application = express();

//setup port
/**
 * port the server will run on
 * @author Sriram Sundar
 *
 * @type {string | number}
 */
const PORT: string | number = process.env.PORT as string;

/**
 * URI of mongodb database to connect to
 * @author Sriram Sundar
 *
 * @type {string}
 */
const MONGO_URI: string = process.env.MONGODB_URI as string;

//setup middleware to allow our frontend to make requests and communicate with our backend and other middlewares
app.use(
  cors({
    origin: [process.env.FRONT_ORIGIN as string],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT "],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(morgan("combined"));

//add routes
app.use("/api/authentication", authenticationRoutes);

//hello world example on / route
app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

//start server and connect to mongodb

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle the error
    throw new Error(error.message);
  });

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });
