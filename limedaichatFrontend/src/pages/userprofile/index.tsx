import { useSelector } from "react-redux";
import { RootState } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colours, getColour } from "@/utils/colours";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { current } from "@reduxjs/toolkit";
import { Button } from "@/components/ui/button";

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

  const saveChanges = () => {
    console.log("Save Changes");
  };
  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max ">
        <div>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer " />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center  justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
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
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
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
