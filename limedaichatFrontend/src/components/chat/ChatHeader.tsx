import {
  closeChat,
  selectChatType,
  selectCurrentChat,
} from "@/state/slices/chatSlice";
import { AppDispatch, ChatType, Textbook } from "@/types";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import { books } from "@/assets";

/**
 * chat header component to be used in the chat container component for the chat page
 * @author Sriram Sundar
 *
 */
const ChatHeader: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const closeWindow = closeChat();
  const selectedChatData = useSelector(selectCurrentChat);
  const selectedChatType = useSelector(selectChatType);

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center w-full">
          <div className="w-12 h-12 relative">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden \">
              <>
                <AvatarImage
                  src={books}
                  alt="books icon"
                  className="object-cover w-full h-full bg-black"
                />
              </>
            </Avatar>
          </div>
          <div>
            {selectedChatType === ("textbook" as ChatType) &&
              `${(selectedChatData as Textbook)?.title}`}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => dispatch(closeWindow)}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
