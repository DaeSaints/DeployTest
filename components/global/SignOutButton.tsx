"use client";
import React from "react";
import TooltipDisplay from "./TooltipDisplay";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  return (
    <TooltipDisplay tooltip={"Sign Out"}>
      <Button
        variant={"ghost"}
        className="w-10 h-10 p-2 rounded-full hover:bg-primary/50 group"
      >
        <LogOut className="w-full h-full transition text-slate-400 group-hover:text-white" />
      </Button>
    </TooltipDisplay>
  );
};

export default SignOutButton;
