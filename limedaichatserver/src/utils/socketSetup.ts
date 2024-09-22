import { Socket, Server as SocketIOServer } from "socket.io";
import { Server } from "http";
import { UserSocketMap } from "@/types";
import { handleSendMessage } from "@/controllers/messageController";
import dotenv from "dotenv";

dotenv.config();

/**
 * socketSetup is a function that sets up the socket server and
 * returns the socketIoServer
 * @author Sriram Sundar
 *
 * @param {Server} - express server
 * @returns {SocketIOServer}
 */
const setupSocket = (server: Server): SocketIOServer => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.FRONT_ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    },
  });

  const userSocketMap: UserSocketMap = new Map();

  const disconnect = (socket: Socket) => {
    console.log("disconnected", socket.id);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.query.userId as string;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log("user id missing.");
    }

    socket.on("sendMessage", (message) =>
      handleSendMessage(io, userSocketMap, message)
    );
    socket.on("disconnect", () => disconnect(socket));
  });

  return io;
};

export default setupSocket;
