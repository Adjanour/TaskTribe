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
    <form onSubmit={handleSubmit} className="w-full space-y-4 px-2">
      <div className="form-control">
        <Input
          className="w-full"
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
        />
      </div>
      <div className="form-control">
        <Input
          label="Password"
          size="md"
          name="password"
          id="password"
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
        <Button type="submit" color="primary" className="w-full">Login</Button>
      </div>
    </form>
  
     <div className="flex w-fit justify-start ml-2 mx-auto mt-4 items-center space-x-4">
        <Button color="primary" onClick={loginWithGoogle} className="flex items-center space-x-2">
            <FcGoogle className="h-5 w-5" />
            <span>Sign in with Google</span>
          </Button>
          <span className="flex items-center">
          <a href="#" className="text-primary-500 text-sm">
            Forgot Password?
          </a>
        </span>
      </div>
    </>
  );
};
