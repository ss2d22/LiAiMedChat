import { Socket, Server as SocketIOServer } from "socket.io";
import { Server } from "http";
import { UserSocketMap } from "@/types";
import dotenv from "dotenv";
import { handleSendMessage } from "@/controllers/SocketMessageController";

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
      methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
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
      console.log("User ID not provided during connection.");
    }

    socket.on("send-message", (message) =>
      handleSendMessage(io, userSocketMap, message)
    );
    socket.on("disconnect", () => disconnect(socket));
  });

  return io;
};

export default setupSocket;
