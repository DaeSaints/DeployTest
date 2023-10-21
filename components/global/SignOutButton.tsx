"use client";
import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import TooltipButton from "./TooltipButton";

const SignOutButton = () => {
  return (
    <TooltipButton tooltip="Sign Out">
      <Button
        variant={"ghost"}
        className="w-10 h-10 p-2 rounded-full hover:bg-primary/50 group"
      >
        <LogOut className="w-full h-full transition text-slate-400 group-hover:text-white" />
      </Button>
    </TooltipButton>
  );
};

export default SignOutButton;
