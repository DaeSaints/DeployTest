"use client";
import React from "react";

// UI
import { ScrollArea } from "@/components/ui/scroll-area";
import MiniChatSingleChat from "./minichat-single-chat";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const CHAT_IDS = [
  "BIvni7klbOGobK5f9ab",
  "pfCCYLGxCyg",
  "nQzWhkn0a3",
  "xFHUjsVuFKJaVZTzj",
  "upA2ty",
  "eWEU9Zur",
  "FOo5eegN24rqqG",
  "8CvVWLb",
];

const MiniChatDrawer = ({
  selectedChat,
  handleSelectChat,
}: {
  selectedChat: string;
  handleSelectChat: (temp: string) => void;
}) => {
  return (
    <div className="w-[17rem] h-full flex flex-col">
      <div className="relative flex items-center justify-between w-full px-2 border-b h-14">
        <Search className="absolute w-5 h-5 -translate-y-1/2 bottom-2 left-2" />
        <Input
          variant={"transparent"}
          placeholder="Search..."
          className="pl-8 border-b-2 border-transparent rounded-none border-b-slate-200"
        />
      </div>
      <ScrollArea className="flex-1 w-full">
        <div className="flex">
          <ul className="flex-col flex-1 border-r">
            {CHAT_IDS.map((_id) => {
              const active = selectedChat === _id;
              return (
                <MiniChatSingleChat
                  key={_id}
                  _id={_id}
                  active={active}
                  handleSelectChat={handleSelectChat}
                />
              );
            })}
          </ul>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MiniChatDrawer;
