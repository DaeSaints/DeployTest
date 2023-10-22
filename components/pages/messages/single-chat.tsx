import Link from "next/link";
import React from "react";

// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SingleChat = ({
  _id,
  active = false,
  isRead = false,
}: {
  _id: string;
  active?: boolean;
  isRead: boolean;
}) => {
  const activeClass = active ? "bg-white/40" : "hover:bg-white/10";
  const readClass = isRead
    ? "font-normal text-slate-300"
    : "font-black text-white";
  return (
    <Link
      href={`/messages/${_id}`}
      className={`${activeClass} w-full px-4 py-5 transition border-b border-white/30 group relative`}
    >
      {!isRead && (
        <div className="absolute w-3 h-3 bg-white rounded-full top-7 right-5"></div>
      )}
      <div className="flex items-center justify-between w-full gap-2">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://images.pexels.com/photos/3656518/pexels-photo-3656518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center flex-1 w-full p-1 overflow-hidden text-white">
          <div className="flex items-center justify-between w-full">
            <span className="font-medium">Matt Thimpson</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <p
              className={`${readClass} line-clamp-1 max-w-[11.5rem] overflow-hidden text-left text-xs `}
            >
              Thanks again for that wonderful
            </p>
            <span className="text-xs text-right text-slate-300">6 min</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleChat;
