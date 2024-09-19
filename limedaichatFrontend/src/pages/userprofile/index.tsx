import { useSelector } from "react-redux";
import { avatarDeleteResponse, avatarUpdateResponse, RootState } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colours, getColour } from "@/utils/colours";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useDeleteDeleteAvatarMutation,
  usePatchUpdateAvatarMutation,
  usePatchUpdateProfileMutation,
} from "@/state/api/profileApi";
import { AppDispatch, AuthApiResponse } from "@/types";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/state/slices/authSlice";
import { BACKEND_URL } from "@/constants";

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
  const avatarUploadRef = useRef<HTMLInputElement>(null);
  const [triggerUpdateProfile] = usePatchUpdateProfileMutation();
  const [triggerUpdateAvatar] = usePatchUpdateAvatarMutation();
  const [triggerDeleteAvatar] = useDeleteDeleteAvatarMutation();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (userInfo?.configuredProfile) {
      setFirstName(userInfo.firstName!);
      setLastName(userInfo.lastName!);
      setTheme(userInfo.theme!);
    }
    if (userInfo?.avatar) {
      console.log(userInfo.avatar);
      setImage(`${BACKEND_URL}/${userInfo.avatar}`);
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
    console.log("uploading avatar click");
    avatarUploadRef?.current?.click();
  };
  const handleAvatarUpdate = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("updating avatar");

    const avatarFile: File | undefined = event.target.files?.[0];
    if (avatarFile) {
      const reqForm = new FormData();
      reqForm.append("avatar", avatarFile);
      const result = (await triggerUpdateAvatar(
        reqForm
      )) as avatarUpdateResponse;
      if ("data" in result && result.data.avatar && userInfo) {
        dispatch(setUserInfo({ ...userInfo, avatar: result.data.avatar }));
        toast.success("头像更新成功");
      }
      console.log();
    }
  };

  const handleAvatarDeletion = async () => {
    console.log("deleting avatar");
    const result = (await triggerDeleteAvatar({})) as avatarDeleteResponse;
    if ("data" in result && result.data.deleted && userInfo) {
      dispatch(setUserInfo({ ...userInfo, avatar: undefined }));
      toast.success("用户头像删除成功");
      setImage(null);
    }
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
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 flex items-center justify-center bg-black/50 rounded-full"
                onClick={image ? handleAvatarDeletion : handleUploadAvatarClick}
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={avatarUploadRef}
              className="hidden"
              onChange={handleAvatarUpdate}
              name="avatar"
              accept=".jpg, .jpeg, .png, .svg, .webp"
            />
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
            onClick={() => void saveChanges}
          >
            保存更改
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
