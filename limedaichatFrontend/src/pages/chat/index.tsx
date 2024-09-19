import ChatContainer from "@/components/chat/containers/ChatContainer";
import ChatSelectedContainer from "@/components/chat/containers/ChatSelectedContainer";
import EmptyChatContainer from "@/components/chat/containers/EmptyChatContainer";
import { RootState } from "@/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

/**
 * the chat page of the app uses relevant components to display the chat
 * interface
 * @author Sriram Sundar
 */
const Chat: React.FC = () => {
  const navigator = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (!userInfo?.configuredProfile) {
      toast.error("您需要配置个人配置文件");
      navigator("/userprofile");
    }
  }, [userInfo, navigator]);

  return (
    <section className="flex h-[100vh] text text-white overflow-hidden">
      <ChatSelectedContainer />
      <ChatContainer />
      {/* <EmptyChatContainer /> */}
    </section>
  );
};

export default Chat;
