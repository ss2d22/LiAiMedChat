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
 // RootState,
  Textbook,
} from "@/types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { usePostFetchMessagesMutation } from "@/state/api/messagesApi";
import { useEffectAsync } from "@/hooks/useEffectAsync";
import { Button } from "@/components/ui/button";

/**
 * Message container for the chat history
 */
const MessageContainer: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatType = useSelector(selectChatType);
  const chatData = useSelector(selectCurrentChat);
  const chatMessages = useSelector(selectChatMessages);
  //const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch: AppDispatch = useDispatch();
  const [triggerFetchMessages] = usePostFetchMessagesMutation();
  const [expandedMessages, setExpandedMessages] = useState<
    Record<number, boolean>
  >({});

  useEffectAsync(async () => {
    if ((chatData as Textbook)?._id) {
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
  }, [chatData, chatType, dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const toggleContextVisibility = (messageIndex: number) => {
    setExpandedMessages((prevState) => ({
      ...prevState,
      [messageIndex]: !prevState[messageIndex],
    }));
  };

  const Messages = () => {
    let lastDate: null | string = null;
    const renderedMessages = [];
    let i = 0;

    while (i < chatMessages.length) {
      const message = chatMessages[i];
      const messageDate = moment(message.timeStamp).format("YYYY-MM-DD"); // Updated here
      const showDate = lastDate !== messageDate;
      lastDate = messageDate;

      const contextMessages: ChatMessage[] = [];

      if (message.isAI && message.messageType === "text") {
        const currentIndex = i;

        let j = i + 1;
        while (
          j < chatMessages.length &&
          chatMessages[j].messageType === "context"
        ) {
          contextMessages.push(chatMessages[j]);
          j++;
        }

        renderedMessages.push(
          <div key={currentIndex}>
            {showDate && (
              <div className="text-center text-gray-500 my-2">
                {moment(message.timeStamp).format("LL")} {/* Updated here */}
              </div>
            )}
            <div className="text-left">
              <div className="bg-[#2a2b33]/5 text-white/80 border-white/20 border inline-block p-4 rounded my-1 max-w-[50%] break-words">
                {message.content}
              </div>
              <div className="text-xs text-gray-600">
                {moment(message.timeStamp).format("LT")} {/* Updated here */}
              </div>
            </div>

            {contextMessages.length > 0 && (
              <div className="text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => toggleContextVisibility(currentIndex)}
                >
                  {expandedMessages[currentIndex]
                    ? "隐藏教科书上下文"
                    : "显示教科书上下文"}
                </Button>
              </div>
            )}

            {expandedMessages[currentIndex] &&
              contextMessages.map((contextMessage, index) => (
                <div
                  key={`context-${currentIndex}-${index}`}
                  className="bg-gray-700/10 border border-gray-500/20 p-4 rounded my-1 max-w-[50%] text-gray-400"
                >
                  {contextMessage.content}
                </div>
              ))}
          </div>
        );

        i = j;
      } else {
        const currentIndex = i;

        renderedMessages.push(
          <div key={currentIndex}>
            {showDate && (
              <div className="text-center text-gray-500 my-2">
                {moment(message.timeStamp).format("LL")} {/* Updated here */}
              </div>
            )}
            <div className={`${message.isAI ? "text-left" : "text-right"}`}>
              <div
                className={`${
                  message.isAI
                    ? "bg-[#2a2b33]/5 text-white/80 border-white/20"
                    : "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
              >
                {message.content}
              </div>
              <div className="text-xs text-gray-600">
                {moment(message.timeStamp).format("LT")} {/* Updated here */}
              </div>
            </div>
          </div>
        );
        i++;
      }
    }

    return renderedMessages;
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65-vw] lg:w-[70vw] xl:w-[80vw] w-full h">
      {Messages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
