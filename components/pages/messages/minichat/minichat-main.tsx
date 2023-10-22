"use client";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const MiniChat = () => {
  const pathname = usePathname();
  const messageLink = "/messages";
  const atMessagePage =
    (pathname.includes(messageLink) && messageLink.length > 1) ||
    pathname === messageLink;

  if (atMessagePage) return null;

  return (
    <Button className="fixed px-4 py-6 text-xl font-bold text-white transition rounded-full shadow bottom-8 right-8 bg-main-500 hover:opacity-40">
      <span className="">Chat</span>{" "}
      <MessageSquare className="ml-2 text-white w-7 h-7" />
    </Button>
  );
};

export default MiniChat;
