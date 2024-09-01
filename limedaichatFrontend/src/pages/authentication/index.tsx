import { books, tigerWelcome } from "@/assets";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSignIn = () => {
    alert("Sign in clicked");
  };

  const handleSignUp = () => {
    alert("Sign up clicked");
  };
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
            <Tabs defaultValue="登录" className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="登录"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-500"
                >
                  登录
                </TabsTrigger>
                <TabsTrigger
                  value="报名"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-500"
                >
                  报名
                </TabsTrigger>
              </TabsList>
              <TabsContent value="登录" className="flex flex-col gap-5 mt-10">
                <Input
                  placeholder="电子邮件"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="密码"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignIn}>
                  登录
                </Button>
              </TabsContent>
              <TabsContent value="报名" className="flex flex-col gap-5">
                <Input
                  placeholder="电子邮件"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="密码"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="确认密码"
                  type="password"
                  className="rounded-full p-6"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignUp}>
                  报名
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={tigerWelcome} alt="中国新年虎踞龙盘，举手欢迎用户" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
