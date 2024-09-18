import { useSelector } from "react-redux";
import { RootState } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colours, getColour } from "@/utils/colours";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePatchUpdateProfileMutation } from "@/state/api/profileApi";
import { AppDispatch, AuthApiResponse } from "@/types";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/state/slices/authSlice";

/**
 * User Profile component that displays the user information and allows user to
 * configure their profile
 * @author Sriram Sundar
 *
 *
 */
const UserProfile: React.FC = () => {
  const navigator = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [theme, setTheme] = useState<number>(0);
  const avatarUploadRef = useRef(null);
  const [triggerUpdateProfile] = usePatchUpdateProfileMutation();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (userInfo?.configuredProfile) {
      setFirstName(userInfo.firstName!);
      setLastName(userInfo.lastName!);
      setTheme(userInfo.theme!);
    }
  }, [userInfo]);

  const validateProfileConfig = () => {
    if (!firstName) {
      toast.error("名字为必填项");
      return false;
    }
    if (!lastName) {
      toast.error("姓氏为必填项");
      return false;
    }
    return true;
  };
  const saveChanges = async () => {
    if (validateProfileConfig()) {
      const result = (await triggerUpdateProfile({
        firstName,
        lastName,
        theme,
      })) as AuthApiResponse;
      if ("data" in result && result.data.user.id) {
        dispatch(setUserInfo(result.data.user));
        navigator("/chat");
      }
    }
  };

  const handleUploadAvatarClick = () => {
    avatarUploadRef?.current?.click();
  };
  
  const handleNavigateBack = () => {
    if (userInfo?.configuredProfile) {
      navigator("/chat");
    } else {
      toast.error("请完成您的个人资料的初始设置");
    }
  };
  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max ">
        <div onClick={handleNavigateBack}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 flex items-center justify-center relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden \">
              {image ? (
                <>
                  <AvatarImage
                    src={image}
                    alt="profile picture avatar"
                    className="object-cover w-full h-full bg-black"
                  />
                </>
              ) : (
                <>
                  <div
                    className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColour(
                      theme
                    )}`}
                  >
                    {firstName
                      ? firstName.split("").shift()
                      : userInfo?.email.split("").shift()}
                  </div>
                </>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 flex items-center justify-center bg-black/50 rounded-full">
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            {/* inputs */}
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="电子邮件"
                type="email"
                disabled
                value={userInfo?.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="名"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="姓"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colours.map((colour, currentIndex) => (
                <div
                  className={`${colour} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    theme === currentIndex
                      ? "outline outline-white outline-1"
                      : ""
                  }`}
                  key={currentIndex}
                  onClick={() => setTheme(currentIndex)}
                >
                  {" "}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            onClick={saveChanges}
          >
            保存更改
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
