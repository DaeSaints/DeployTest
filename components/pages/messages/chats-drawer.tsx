"use client";
import React from "react";
import SingleChat from "./single-chat";
import { usePathname } from "next/navigation";
import { ChatType } from "@/lib/interfaces/chat.interface";

const ChatsDrawer = ({data}:{data :ChatType[] }) => {
  const pathname = usePathname();

  return (
    <>
      {data.length > 0 ? (
        <>
          {data.map((chat) => {
            return (
              <SingleChat
                key={chat?._id}
                _id={chat?._id as string}
                active={pathname.includes(chat?._id as string)}
                isRead={chat?.latestMessage?.isRead}
                data={chat}
              />
            );
          })}
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          No Chats Found
        </div>
      )}
    </>
  );
};

export default ChatsDrawer;