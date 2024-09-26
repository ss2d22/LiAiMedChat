import React from "react";
import {
  selectCurrentChat,
  setSelectedChatData,
  setSelectedChatMessages,
  setSelectedChatType,
} from "@/state/slices/chatSlice";
import {
  AppDispatch,
  ChatData,
  ChatType,
  Textbook,
  TextbookListProps,
} from "@/types";
import { Avatar } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { books } from "@/assets"; // ensure this does not throw errors as sometimes on arch it says it cannot find the module idk wy

/**
 * Textbook list component for the sidebar
 * @author Sriram Sundar
 *
 * @param {{ textbooks: any; }} param0
 * @param {*} param0.textbooks
 */
const TextbookList: React.FC<TextbookListProps> = ({ textbooks }) => {
  const selectedChatData = useSelector(selectCurrentChat);
  const dispatch: AppDispatch = useDispatch();

  const handleClick = (textbook: Textbook) => {
    dispatch(setSelectedChatType("textbook" as ChatType));
    dispatch(setSelectedChatData(textbook as ChatData));
    if (
      selectedChatData &&
      (selectedChatData as Textbook)._id !== textbook._id
    ) {
      dispatch(setSelectedChatMessages([]));
    }
  };

  return (
    <div className="mt-5">
      {textbooks.map((textbook) => (
        <div
          key={textbook._id}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData &&
            (selectedChatData as Textbook)._id === textbook._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
          onClick={() => handleClick(textbook)}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            <Avatar className="h-10 w-10">
              <img
                src={books}
                alt="Textbook"
                className="rounded-full bg-cover h-full w-full"
              />
            </Avatar>
            {/* <span>{`${textbook.title} by ${textbook.author}`}</span> */}
            <span>{`${textbook.title}`}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TextbookList;
