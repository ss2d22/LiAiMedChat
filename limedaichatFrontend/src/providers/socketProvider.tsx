import { BACKEND_URL } from "@/constants";
import { SocketContext } from "@/context/socketContext";
import { RootState, SocketProviderProps } from "@/types";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

/**
 * Socket provider that provides the socket to the application
 * @author Sriram Sundar
 *
 * @param {SocketProviderProps} param0
 * @param {SocketProviderProps} param0.children
 */
export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
}: SocketProviderProps) => {
  const socket = useRef<Socket | null>(null);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      socket.current = io(BACKEND_URL, {
        withCredentials: true,
        query: {
          userId: userInfo.id,
        },
      });
      socket.current.on("connect", () => {
        console.log("socket connected");
      });

      return () => {
        socket.current?.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
