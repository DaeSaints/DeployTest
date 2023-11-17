"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import OpenMiniChat from "./minichat-open";
import { useSession } from "next-auth/react";
import { UserType } from "@/lib/interfaces/user.interface";

const MiniChat = () => {
  const [toggleMiniChat, setToggleMiniChat] = useState<boolean>(false);
  const pathname = usePathname();
  const messageLink = "/messages";
  const atMessagePage =
    (pathname.includes(messageLink) && messageLink.length > 1) ||
    pathname === messageLink;

  const { data: session } = useSession();
  const userInfo = session?.user as UserType;

  if (atMessagePage) return null;

  if (toggleMiniChat) {
    return (
      <OpenMiniChat close={() => setToggleMiniChat(false)} userId={userInfo?._id as string} />
    );
  }

  return (
    <Button
      onClick={() => setToggleMiniChat(true)}
      className="fixed px-4 py-6 text-xl font-bold text-white transition rounded-full shadow bottom-8 right-8 bg-main-500 hover:opacity-40 animate-in"
    >
      <span className="">Chat</span>
      <MessageSquare className="ml-2 text-white w-7 h-7" />
    </Button>
  );
};

export default MiniChat;
