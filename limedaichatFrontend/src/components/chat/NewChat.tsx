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

const NewChat = () => {
  const [newChatModal, setNewChatModal] = useState(false);
  const [searchedTextbooks, setSearchedTextbooks] = useState([]);

  const searchTextbooks = async (bookName: string) => {
    console.log(bookName);
    await searchTextbooks("placeholderFunctions");
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
          {searchedTextbooks.length <= 0 && (
            <div className="flex-1 md:flex mt-5 flex-col justify-center items-center duration-1000 transition-all">
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
