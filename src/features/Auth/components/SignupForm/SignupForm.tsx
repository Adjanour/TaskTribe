import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "../EyeSlashFilledIcon";
import useAuth from "@/hooks/useAuth";
import {Button} from "@nextui-org/react";

export const SignupForm = () => {
  const {signUp} = useAuth();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    await signUp(target.email.value, target.password.value);
  }
  return (
    <>
    <form onSubmit={handleSubmit} className="w-full space-y-4 px-2">
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <Input
          className="w-full"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          size="lg"
          radius="sm"
          tabIndex={0}
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <Input
          size="lg"
          name="password"
          id="password"
          tabIndex={1}
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
        <Button tabIndex={3} type="submit" spinner color="primary" className="bg-blue-700 w-full">Sign Up</Button>
      </div>
      <div className="flex w-full justify-center mx-auto items-center space-x-4">
        <span className="text-sm">Already have an account? <a href="/auth/login" className="text-blue-700">Login</a></span>
      </div>
    </form>
   
    </>
  );
};

