import { books } from "@/assets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">欢迎</h1>
              <img src={books} alt="books icon" className="w-[100px]" />
            </div>
            <p className="font-medium text-center">
              请填写您的详细信息，以访问 Li Med Ai
              平台。(仅限××大学医学专业学生）
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs>
              <TabsList>
                <TabsTrigger value="登录">登录</TabsTrigger>
                <TabsTrigger value="报名">报名</TabsTrigger>
              </TabsList>
              <TabsContent value="登录"></TabsContent>
              <TabsContent value="报名 "></TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
