import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "../EyeSlashFilledIcon";
import useAuth from "@/hooks/useAuth";
import {Button} from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";

export const LoginForm = () => {
  const {loginWithGoogle,signIn} = useAuth();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    await signIn(target.email.value, target.password.value);
  }
  return (
    <>
    <form onSubmit={handleSubmit} className="w-full space-y-4 px-2 py-2">
      <div>
        <label htmlFor="email" className="text-default-900">Email</label>
        <Input
          className="w-full mb-2"
          id="email"
          name="email"
          type="email"
          size="lg"
          labelPlacement="outside"
          placeholder="Enter your email"
          
          radius="sm"
        />
      </div>
      <div >
        <label htmlFor="password" className="text-default-900">Password</label>
        <Input
          size="lg"
          name="password"
          id="password"
          radius="sm"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="w-full"
        />
      </div>

      <div className="flex w-full justify-center mx-auto items-center space-x-4">
        <Button type="submit" color="primary" className="w-full bg-blue-700">Login</Button>
      </div>
      <div className="flex w-full justify-start mx-auto mt-4 items-center space-x-4">
        <Button color="primary" onClick={loginWithGoogle} className="flex bg-blue-700 items-center space-x-2">
            <span className="rounded-full bg-white p-1"><FcGoogle className="h-5 w-5" /></span>
            <span>Sign in with Google</span>
          </Button>
          <span className="flex items-center">
          <a href="#" className="text-sm text-foreground">
            Forgot Password?
          </a>
        </span>
      </div>
    </form>
  
     
    </>
  );
};
