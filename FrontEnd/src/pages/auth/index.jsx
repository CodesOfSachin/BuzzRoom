import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { apliclient } from "@/lib/api-client";
import { SIGNUP_ROUTES } from "/utils/constants";




const Auth = () => { 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const validateLogin = () => {
    if(!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if(!password.length) {
      toast.error("Password is required");
      return false;
    }
    return true;
  }

  const validateSignup = () => {
    if(!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if(!password.length) {
      toast.error("Password is required");
      return false
    }
    if(!confirmPassword.length) {
      toast.error("Confrim Password is required");
      return false
    }
    if(confirmPassword !== password) {
      toast.error("Password and Confirm Password doesn't match!");
      return false
    }
    return true;
  };

  const handleLogin = async () => {};
  const handleSignup = async () => {
    if(validateSignup()) {
      const response = await apliclient.post(SIGNUP_ROUTES, { email, password}, {withCredentials: ture})
      console.log(response);
      
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">Fill in the details to get started with the best chat app!</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="cursor-pointer data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="cursor-pointer data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
  
                <Button className="cursor-pointer rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
  
              <TabsContent className="flex flex-col gap-5 mt-10" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                ></Input> 
                <Button className="cursor-pointer rounded-full p-6" onClick={handleSignup}>
                  Sign Up
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="Background" />
        </div>
      </div>
    </div>
  );
  

};

export default Auth;