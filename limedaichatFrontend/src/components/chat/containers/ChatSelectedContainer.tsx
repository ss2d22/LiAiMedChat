import { books } from "@/assets";
import Title from "@/components/Title";

/**
 * chat selection side bar component
 * @author Sriram Sundar
 *
 */
const ChatSelectedContainer : React.FC = () => {
  return (
    <section className="relative md:w-[35vw] lg:[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      {/* TODO: second time using the same thing need to refactor to component */}
      <div className="pt-3 flex items-center justify-center">
        <h1 className="text-5xl font-bold md:text-4xl">LiMedAi</h1>
        <img src={books} alt="books icon" className="w-[80px]" />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="与课本的聊天记录" />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="更新 / 公告" />
        </div>
      </div>
    </section>
  );
};

export default ChatSelectedContainer;
