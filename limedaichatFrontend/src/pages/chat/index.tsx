import { RootState } from "@/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * Placeholder for the chat page
 * @author Sriram Sundar
 *
 *
 */
const Chat: React.FC = () => {
  const navigator = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (!userInfo?.configuredProfile) {
      navigator("/userprofile");
    }
  }, [userInfo, navigator]);

  return (
    <>
      <div>Chat</div>
    </>
  );
};

export default Chat;
