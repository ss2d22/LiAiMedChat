import { Server, Socket, Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Application } from "express";

/**
 * socketSetup is a function that sets up the socket server and
 * returns the socketIoServer
 * @author Sriram Sundar
 *
 * @param {Application} app
 * @returns {SocketIOServer}
 */
const socketSetup = (app: HttpServer): SocketIOServer => {
  const io: SocketIOServer = new SocketIOServer(app, {
    cors: {
      origin: process.env.FRONT_ORIGIN as string,
      //TODO: update methods to only include what is used after completion
      methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
      credentials: true,
    },
  });

  const userSocketMap: Map<string, string> = new Map();

  const disconnectUser = (socket: Socket) => {
    console.log(`User ${socket.id} disconnected`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  io.on("connection", (socket) => {
    console.log("A user connected");
    const userId = socket.handshake.query.userId as string;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} connected`);
    } else {
      console.error("User not connected as id not provided");
    }

    socket.on("disconnect", () => disconnectUser(socket));
  });
  console.log("Socket server setup");

  return io;
};

export default socketSetup;
