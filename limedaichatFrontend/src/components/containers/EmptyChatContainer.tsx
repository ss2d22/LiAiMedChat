import { animationOptions } from "@/utils/animationOptions";
import Lottie from "react-lottie";

const EmptyChatContainer = () => {
  return (
    <section className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationOptions}
      />
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className="noto-serif-sc-normal">
          你好<span className="text-purple-500">！</span>欢迎来到
          <span className="text-purple-500"> LiMedAi</span> 聊天室
          <span className="text-purple-500">.</span>
        </h3>
      </div>
    </section>
  );
};

export default EmptyChatContainer;
