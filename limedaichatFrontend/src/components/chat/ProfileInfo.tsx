import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, signOutResponse } from "@/types";
import { getColour } from "@/utils/colours";
import { BACKEND_URL } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoPowerSharp } from "react-icons/io5";
import { usePostSignOutMutation } from "@/state/api/authenticationApi";
import { setUserInfo } from "@/state/slices/authSlice";

/**
 * Profile info component that displays avatar, full name , edit profile and signout
 * @author Sriram Sundar
 *
 */
const ProfileInfo: React.FC = () => {
  const navigator = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [triggerSignOut] = usePostSignOutMutation();
  const dispatch: AppDispatch = useDispatch();

  const signOut = async () => {
    console.log("in signout");

    const result = (await triggerSignOut({})) as signOutResponse;
    if ("data" in result && result.data.message) {
      navigator("/authentication");
      dispatch(setUserInfo(undefined));
    }
  };

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden \">
            {userInfo?.avatar ? (
              <>
                <AvatarImage
                  src={`${BACKEND_URL}/${userInfo.avatar}`}
                  alt="profile picture avatar"
                  className="object-cover w-full h-full bg-black"
                />
              </>
            ) : (
              <>
                <div
                  className={`uppercase h-12 w-12 text-1xl border-[1px] flex items-center justify-center rounded-full ${getColour(
                    userInfo?.theme ?? 0
                  )}`}
                >
                  {userInfo?.firstName
                    ? userInfo?.firstName.split("").shift()
                    : userInfo?.email.split("").shift()}
                </div>
              </>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo?.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-purple-500 text-xl font-medium"
                onClick={() => navigator("/userprofile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              编辑个人资料
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                className="text-red-500 text-xl font-medium"
                onClick={() => void signOut()}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              注销
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
