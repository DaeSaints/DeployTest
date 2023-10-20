"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProgressPage from "./progressbar";
const PageOne = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <ProgressPage page={page} totalPages={totalPages} />
        <p className="max-w-[35rem] text-4xl text-black font-medium my-4">
          Welcome! What would you like us to call you?
        </p>
      </div>
      <div className="flex items-start justify-start flex-1 py-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username" className="text-xl font-medium">
            Username
          </Label>
          <Input
            type="text"
            id="name"
            className="p-3 text-2xl h-fit"
            placeholder="Enter your username"
          />
        </div>
      </div>
    </>
  );
};

export default PageOne;
