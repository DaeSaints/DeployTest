"use client";
import React from "react";

// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRolesType } from "@/lib/interfaces/user.interface";
import { ChatType } from "@/lib/interfaces/chat.interface";
import { Image, ImageIcon } from "lucide-react";

const MiniChatSingleChat = ({
  _id,
  handleSelectChat,
  active = false,
  name,
  latestContent,
  recipientRole,
  chat,
}: {
  _id: string;
  active?: boolean;
  handleSelectChat: (chat: ChatType | null) => void;
  name: string;
  latestContent: string;
  recipientRole: UserRolesType;
  chat: ChatType;
}) => {
  return (
    <li className="w-full">
      <button
        type="button"
        className="w-full"
        onClick={() => {
          if (active) handleSelectChat(null);
          else handleSelectChat(chat);
        }}
      >
        <div
          className={`flex items-center justify-start w-full py-4 gap-2 px-4 h-20 transition border-b ${
            active ? "bg-main-200" : "hover:bg-slate-100"
          }`}
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex items-center justify-between flex-1 gap-4">
              <span className="flex-[4] text-sm font-bold text-left capitalize line-clamp-1">
                {name}
              </span>
              <span className="flex-1 text-xs text-right capitalize">
                {recipientRole}
              </span>
            </div>
            <div className="flex items-center justify-between flex-1 gap-2">
              <p className="flex-[4] text-xs text-left line-clamp-1">
                You: {chat.latestMessage.isImage ? "Image Upload" : latestContent}
              </p>
              <span className="flex-1 text-xs text-right text-slate-500">
                {"9:00am"}
              </span>
            </div>
          </div>
        </div>
      </button>
    </li>
  );
};

export default MiniChatSingleChat;
