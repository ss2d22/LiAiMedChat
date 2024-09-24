import {
  selectChatMessages,
  selectChatType,
  selectCurrentChat,
  setSelectedChatMessages,
} from "@/state/slices/chatSlice";
import {
  AppDispatch,
  ChatMessage,
  ChatType,
  fetchMessagesResponse,
  RootState,
  Textbook,
} from "@/types";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { usePostFetchMessagesMutation } from "@/state/api/messagesApi";
import { useEffectAsync } from "@/hooks/useEffectAsync";
/**
 * Message container for the chat history
 * @author Sriram Sundar
 *
 */
const MessageContainer: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatType = useSelector(selectChatType);
  const chatData = useSelector(selectCurrentChat);
  const chatMessages = useSelector(selectChatMessages);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch: AppDispatch = useDispatch();
  const [triggerFetchMessages] = usePostFetchMessagesMutation();

  useEffectAsync(async () => {
    if ((chatData as Textbook)._id) {
      if (chatType === ("textbook" as ChatType)) {
        const response = (await triggerFetchMessages({
          textbookId: (chatData as Textbook)._id,
          receiverModel: "Textbook",
        })) as fetchMessagesResponse;

        if ("data" in response && response.data.messages) {
          dispatch(setSelectedChatMessages(response.data.messages));
        }
      }
    }
  }, [chatData, chatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectChatMessages]);

  const renderMessage = (message: ChatMessage) => (
    <div className={`${message.isAI ? "text-left" : "text-right"}`}>
      {message.messageType === "text" && (
        <div
          className={`${
            message.isAI
              ? "bg-[#2a2b33]/5 text-white/80 border-white/20"
              : "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );
  const Messages = () => {
    let lastDate: null | string = null;

    return chatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = lastDate !== messageDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {chatType === ("textbook" as ChatType) && renderMessage(message)}
        </div>
      );
    });
  };
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65-vw] lg:w-[70vw] xl:w-[80vw] w-full h">
      {Messages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
