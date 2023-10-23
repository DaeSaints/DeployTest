"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProgressPage from "./progressbar";
const PageTwo = ({
  page,
  totalPages,
  onPasswordChange, 
  onConfirmPasswordChange, 
  passwordsMatch, 
  passwordValid,
  confirmPasswordValid,
}: {
  page: number;
  totalPages: number;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordsMatch: boolean;
  passwordValid: boolean;
  confirmPasswordValid: boolean;
}) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <ProgressPage page={page} totalPages={totalPages} />
        <p className="max-w-[35rem] text-4xl text-black font-medium my-4">
          While you're at it, change your password for better security!
        </p>
      </div>
      <div className="flex flex-col items-start justify-start flex-1 gap-10 py-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password" className="text-xl font-medium">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            className="p-3 text-2xl h-fit"
            placeholder="Enter your Password"
            onChange={onPasswordChange}
          />
        </div>
        {!passwordValid && (
          <p className="text-red-600">Password must be at least 8 characters.</p>
        )}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="confirm-password" className="text-xl font-medium">
            Confirm Password
          </Label>
          <Input
            type="password"
            id="confirm-password"
            className={passwordsMatch ? "p-3 text-2xl h-fit" : "p-3 text-2xl h-fit border-red-500"}
            placeholder="Confirm your password"
            onChange={onConfirmPasswordChange}
          />
        </div>
        {!passwordsMatch && (
          <p className="text-red-600">Please make sure your password match.</p>
        )}
        {!confirmPasswordValid && (
          <p className="text-red-600">Password must be at least 8 characters.</p>
        )}
      </div>
    </>
  );
};

export default PageTwo;
