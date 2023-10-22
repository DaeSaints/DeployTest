"use client";
import React from "react";
import SingleChat from "./single-chat";
import { usePathname } from "next/navigation";

const ChatsDrawer = () => {
  const pathname = usePathname();
  const CHATS = [
    { isRead: true, _id: "NiqpdL" },
    { isRead: false, _id: "F6hrfhYKx" },
    { isRead: false, _id: "7AbQs8jgjZk" },
    { isRead: true, _id: "ykUrYGq0aVE57VFs" },
    { isRead: true, _id: "BJNpo88BXhFG3aV58E" },
    { isRead: false, _id: "6Zb7uDu" },
    { isRead: false, _id: "fY3N9fvgZ3D" },
    { isRead: false, _id: "3Cz4eKOtdLhAbd" },
  ];
  return (
    <>
      {CHATS.map((chat) => {
        return (
          <SingleChat
            key={chat._id}
            _id={chat._id}
            active={pathname.includes(chat._id)}
            isRead={chat.isRead}
          />
        );
      })}
    </>
  );
};

export default ChatsDrawer;
