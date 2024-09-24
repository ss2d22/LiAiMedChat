import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { animationOptions } from "@/utils/animationOptions";
import Lottie from "react-lottie";
import { usePostSearchTextbooksMutation } from "@/state/api/textbookApi";
import { ChatType, searchTextbookResponse, Textbook } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "../ui/avatar";
import { books } from "@/assets";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/types";
import {
  setSelectedChatType,
  setSelectedChatData,
} from "@/state/slices/chatSlice";

/**
 * New chat component that allows user to searcha and select a new chat
 * @author Sriram Sundar
 */
const NewChat: React.FC = () => {
  const [newChatModal, setNewChatModal] = useState<boolean>(false);

  const [searchedTextbooks, setSearchedTextbooks] = useState<Textbook[]>([]);
  const [triggerSearchTextbooks] = usePostSearchTextbooksMutation();
  const dispatch: AppDispatch = useDispatch();

  const searchTextbooks = async (bookName: string) => {
    console.log("searching...");
    console.log(bookName);

    console.log(bookName.length);

    if (bookName.length > 0) {
      console.log("starting server process");

      const result = (await triggerSearchTextbooks({
        textbook: bookName,
      })) as searchTextbookResponse;
      console.log(result);

      if ("data" in result && result.data.textbooks) {
        setSearchedTextbooks(result.data.textbooks);
      } else {
        setSearchedTextbooks([]);
      }
    }
  };

  const selectNewTextbook = (textbook: Textbook) => {
    setNewChatModal(false);
    dispatch(setSelectedChatType("textbook" as ChatType));
    console.log(textbook);

    dispatch(setSelectedChatData(textbook));
    console.log(textbook);
    setSearchedTextbooks([]);
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-small hover:text-neutral-100 cursor-pointer transition-all duration-300 "
              onClick={() => setNewChatModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            选择要聊天的教科书
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChatModal} onOpenChange={setNewChatModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col p-7">
          <DialogHeader className="items-center">
            <DialogTitle>请选择要聊天的教科书</DialogTitle>
            {/* <DialogDescription>请选择要聊天的教科书 </DialogDescription> */}
          </DialogHeader>
          <div>
            <Input
              placeholder="搜索教科书"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => void searchTextbooks(e.target.value)}
            />
          </div>
          {searchedTextbooks.length > 0 && (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchedTextbooks.map((textbook, index) => {
                  return (
                    <div
                      key={index}
                      className="flex gap-3 items-center cursor-pointer"
                      onClick={() => void selectNewTextbook(textbook)}
                    >
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
                      <div className="flex flex-col">
                        <span>{textbook ? `${textbook.title}` : ""}</span>
                        <span className="text-xs">{textbook.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
          {searchedTextbooks.length <= 0 && (
            <div className="flex-1 md:flex mt-5 md:mt-0 flex-col justify-center items-center duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationOptions}
              />
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center">
                <h3 className="noto-serif-sc-normal">
                  你好<span className="text-purple-500">！</span>
                  搜索<span className="text-purple-500"> 教科书</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewChat;
