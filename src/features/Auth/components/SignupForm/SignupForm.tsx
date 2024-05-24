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
        <Button type="submit" spinner color="primary">Sign Up</Button>
      </div>
    </form>
   
    </>
  );
};

