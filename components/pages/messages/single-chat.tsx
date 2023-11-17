import Link from "next/link";
import React from "react";

// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatType } from "@/lib/interfaces/chat.interface";
import { useSession } from "next-auth/react";
import { UserType } from "@/lib/interfaces/user.interface";
import { isParent } from "@/utils/helpers/isParent";

const SingleChat = ({
  _id,
  active = false,
  isRead = false,
  data,
}: {
  _id: string;
  active?: boolean;
  isRead: boolean;
  data: ChatType;
}) => {
  const activeClass = active ? "bg-main-500/40" : "hover:bg-main-500/10";
  const readClass = isRead
    ? "font-normal text-slate-600"
    : "font-black text-black";

  const { data: session } = useSession();
  const userInfo = session?.user as UserType;
  if (!userInfo) return null;

  const recipient = data?.users?.find((d) => d._id !== userInfo?._id);
  const lastMessage = data?.latestMessage;
  const role = isParent(recipient) ? "Parent" : recipient?.role;
  const today = new Date();
  const formattedDate =
    data.latestMessage?.createdAt.toDateString() === today.toDateString()
      ? data.latestMessage.createdAt.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : data.latestMessage?.createdAt
          .toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(/\s/g, " ");

  return (
    <Link
      href={`/messages/${_id}`}
      className={`${activeClass} w-full px-4 py-5 transition border-b border-white/30 group relative`}
    >
      {!isRead && (
        <div className="absolute w-3 h-3 bg-main-500 rounded-full top-7 right-5"></div>
      )}
      <div className="flex items-center justify-between w-full gap-2">
        <Avatar className="w-12 h-12">
          <AvatarImage src={recipient?.profileURL || ""} />
          <AvatarFallback className="capitalize bg-main-400 text-white">
            {recipient?.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center flex-1 w-full p-1 overflow-hidden text-black">
          <div className="flex items-center justify-between w-full">
            <span className="font-medium capitalize">{recipient?.name}</span>
            <span className="font-medium capitalize">{role}</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <p
              className={`${readClass} line-clamp-1 max-w-[11.5rem] overflow-hidden text-left text-xs `}
            >
              {lastMessage?.content}
            </p>
            <span className="text-xs text-right text-slate-600">
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleChat;
