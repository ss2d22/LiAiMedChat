import { BACKEND_URL } from "@/constants";
import { SocketContext } from "@/context/socketContext";
import {
  addChatMessage,
  selectChatType,
  selectCurrentChat,
} from "@/state/slices/chatSlice";
import {
  ChatMessage,
  RootState,
  SocketProviderProps,
  Textbook,
  UserInformation,
} from "@/types";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const chatType = useSelector(selectChatType);
  const chatData = useSelector(selectCurrentChat);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (socket.current) {
      console.log("setting up receive-message listener");

      const receiveMessage = (message: ChatMessage) => {
        console.log("received message", message);
        if (
          chatType !== undefined &&
          ((chatData as UserInformation)?.id ===
            (message.sender as UserInformation)?.id ||
            (chatData as UserInformation)?.id ===
              (message.receiver as UserInformation)?.id ||
            (chatData as Textbook)?._id === (message.sender as Textbook)._id ||
            (chatData as Textbook)?._id === (message.receiver as Textbook)._id)
        ) {
          console.log("adding message to chat");

          dispatch(addChatMessage(message));
        }
      };

      socket.current.on("receive-message", receiveMessage);
      return () => {
        socket.current?.off("receive-message", receiveMessage);
      };
    }
  }, [chatType, chatData, dispatch]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
