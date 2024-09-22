import { Response } from "express";
import { ChatMessage, Request, UserSocketMap } from "@/types";
import { Server as SocketIOServer } from "socket.io";

//placeholder functions
export const getMessages = async (request: Request, response: Response) => {};

export const uploadFile = async (req: Request, res: Response) => {};

export const handleSendMessage = async (
  io: SocketIOServer,
  userSocketMap: UserSocketMap,
  message: ChatMessage
) => {};
