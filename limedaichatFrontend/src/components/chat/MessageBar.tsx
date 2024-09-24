import { useSocket } from "@/hooks/useSocket";
import { selectChatType, selectCurrentChat } from "@/state/slices/chatSlice";
import { ChatType, RootState, Textbook } from "@/types";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { useSelector } from "react-redux";

/**
 *  Message Bar component with the send button , emoji picker and file upload button
 * @author Sriram Sundar
 *
 */
const MessageBar: React.FC = () => {
  const [Message, setMessage] = useState<string>("");
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const chatType = useSelector(selectChatType);
  const chatData = useSelector(selectCurrentChat);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const socket = useSocket();

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setEmojiOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [emojiRef]);

  const addEmoji = (emoji: EmojiClickData) => {
    setMessage((Message) => Message + emoji.emoji);
  };
  const sendMessage = () => {
    console.log("sending message");
    console.log(chatType);

    if (chatType === ("textbook" as ChatType)) {
      console.log("sending message to textbook");
      console.log(socket);
      socket?.emit("send-message", {
        sender: userInfo?.id,
        content: Message,
        receiver: (chatData as Textbook)?._id,
        receiverModel: "Textbook",
        isAI: false,
        messageType: "text",
      });
    }
  };
  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          id="messageInput"
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="输入您的留言"
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => setEmojiOpen(true)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme={"dark" as Theme}
              open={emojiOpen}
              onEmojiClick={addEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          onClick={sendMessage}
        >
          <IoSend className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default MessageBar;
