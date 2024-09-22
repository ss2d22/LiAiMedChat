import { Context, createContext } from "react";
import { Socket } from "socket.io-client";

/**
 * Socket context that provides the socket context to the application
 * @author Sriram Sundar
 *
 * @type {Context<Socket | null>}
 */
export const SocketContext: Context<Socket | null> =
  createContext<Socket | null>(null);
