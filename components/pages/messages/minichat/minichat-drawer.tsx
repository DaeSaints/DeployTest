"use client";
import React, { useEffect, useState } from "react";

// UI
import { ScrollArea } from "@/components/ui/scroll-area";
import MiniChatSingleChat from "./minichat-single-chat";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

// BACKEND
import { fetchChats } from "@/lib/actions/chat.action";
import { useQuery } from "@tanstack/react-query";
import { UserRolesType, UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { ChatType } from "@/lib/interfaces/chat.interface";
import { pusherClient } from "@/lib/pusher";

const MiniChatDrawer = ({
  selectedChat,
  handleSelectChat,
}: {
  selectedChat: ChatType | null;
  handleSelectChat: (temp: ChatType | null) => void;
}) => {
  const userId = "65176d6b9ce0272c671d6583";

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`minichat-${userId}:chats`],
    queryFn: async () => {
      const { chats } = await fetchChats({
        pageNumber: 1,
        pageSize: 20,
        userId,
      });
      return chats;
    },
  });

  React.useEffect(() => {
    pusherClient.subscribe(userId);

    pusherClient.bind("fetch-chats", () => {
      refetch();
    });
    return () => {
      pusherClient.unsubscribe(userId);
    };
  }, []);

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
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex">
              <ul className="flex-col flex-1 border-r">
                {data?.map((chat) => {
                  const _id = chat._id as string;
                  const active = selectedChat?._id === _id;
                  const recipient: UserType | ParentType = chat.users.find(
                    (d) => d._id !== userId
                  ) as UserType | ParentType;

                  // @ts-ignore
                  let recipientRole: UserRolesType = recipient.role || "parent";
                  return (
                    <MiniChatSingleChat
                      key={_id}
                      _id={_id}
                      chat={chat}
                      active={active}
                      handleSelectChat={handleSelectChat}
                      name={recipient?.name as string}
                      latestContent={chat.latestMessage.content}
                      recipientRole={recipientRole}
                    />
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </ScrollArea>
    </div>
  );
};

export default MiniChatDrawer;
