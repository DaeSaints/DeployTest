"use client";
import React from "react";

// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MiniChatSingleChat = ({
  _id,
  handleSelectChat,
  active = false,
}: {
  _id: string;
  active?: boolean;
  handleSelectChat: (_id: string) => void;
}) => {
  return (
    <li className="">
      <button
        type="button"
        className={`flex items-center justify-start w-full py-4 px-2 h-20 transition border-b ${
          active ? "bg-main-200" : "hover:bg-slate-100"
        }`}
        onClick={() => {
          if (active) handleSelectChat("");
          else handleSelectChat(_id);
        }}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1 mx-2 -space-y-1 overflow-hidden">
          <div className="flex items-center justify-between flex-1 gap-4">
            <span className="w-full text-sm font-bold text-left line-clamp-1">
              Kielo Mercado
            </span>
            <span className="w-24 text-xs text-right">Parent</span>
          </div>
          <div className="flex items-center justify-between flex-1 gap-2">
            <p className="text-xs text-left line-clamp-1">
              You: army across silver hang bent oil ten lunch two separate
              gasoline plant ourselves cause different worker chart announced
              hand wore suit pupil steel produce
            </p>
            <span className="w-24 text-xs text-right text-slate-500">
              {"9:00am"}
            </span>
          </div>
        </div>
      </button>
    </li>
  );
};

export default MiniChatSingleChat;
