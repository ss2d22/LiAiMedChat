import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// setup server
dotenv.config();
const app = express();

//setup port
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI;

//hello world example
app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle the error
    throw new Error(error.message);
  });
