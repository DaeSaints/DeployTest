"use client";
import React from "react";

// BACKEND
import useFetchSelectedChat from "@/lib/hooks/getSelectedChat";
import { isParent } from "@/utils/helpers/isParent";

// UI
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/global/Loader";

const ChatHeader = ({ userId, chatId }: { userId: string; chatId: string }) => {
  const { data: selectedChat, isLoading: isLoadingSelectedChat } =
    useFetchSelectedChat(chatId);
  const recipient = selectedChat?.users?.find((d) => d._id !== userId);

  if (isLoadingSelectedChat)
    return (
      <div className="">
        <Loader />
      </div>
    );
  return (
    <header className="flex items-center justify-between w-full h-24 px-6 pt-4 pb-6 border-b border-slate-400">
      <h2 className="text-lg font-medium ">
        <span className="capitalize">{recipient?.name} </span>
        <span className="text-sm font-normal">({recipient?.email})</span>
      </h2>
      {isParent(recipient) ? (
        <>
          <Badge className="py-1 text-sm px-4">Parent</Badge>
        </>
      ) : (
        <Badge className="capitalize py-1 text-sm px-4">
          {recipient?.role}
        </Badge>
      )}
    </header>
  );
};

export default ChatHeader;