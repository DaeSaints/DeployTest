"use client";
import React from "react";

// UI
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User2Icon } from "lucide-react";
import MiniChatSendMessage from "./minichat-send-message";

const MiniChatNewBox = () => {
  return (
    <div className="flex flex-col flex-1 w-full">
      <header className="flex items-center justify-start w-full gap-2 px-2 bg-main-300 h-14">
        <span className="text-sm">To: </span>
        <input
          type="text"
          className="flex-1 text-sm text-black bg-transparent border-none outline-none placeholder:text-black"
          placeholder="Who do you want to talk to?"
        />
        <Select>
          <SelectTrigger className="w-[8rem]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Role</SelectLabel>
              <SelectItem value="asd">Parent</SelectItem>
              <SelectItem value="asd">General Manager</SelectItem>
              <SelectItem value="asd">Teacher</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </header>
      <main className="flex flex-col flex-1 w-full">
        <div className="flex flex-col items-center justify-center flex-1 w-full gap-2">
          <div className="w-24 h-24 p-3 overflow-hidden rounded-full bg-slate-100">
            <User2Icon className="w-full h-full text-slate-400" />
          </div>
          <span className="">Select a new recipient</span>
        </div>
        <div className="w-full h-16">
          <MiniChatSendMessage chatId="" senderId="" disabled/>
        </div>
      </main>
    </div>
  );
};

export default MiniChatNewBox;
