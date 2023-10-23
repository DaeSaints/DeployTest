"use client";
import React, { useState } from "react";
import Link from "next/link";

// UI
import TooltipButton from "@/components/global/TooltipButton";
import { Button } from "@/components/ui/button";
import { Maximize, MinusSquare } from "lucide-react";

import MiniChatMessages from "./minichat-messages";
import MiniChatDrawer from "./minichat-drawer";

const OpenMiniChat = ({ close }: { close: () => void }) => {
  const [selectedChat, setSelectedChat] = useState<string>("");
  function handleSelectChat(_id: string) {
    setSelectedChat(_id);
  }

  return (
    <section className="fixed flex flex-col w-full max-w-2xl duration-300 bg-white border rounded-lg shadow h-[28rem] bottom-8 right-8 overflow-hidden">
      <header className="flex items-center justify-between w-full px-4 py-2 bg-main-400">
        <span className="text-xl font-semibold text-white">Inbox</span>
        <div className="flex gap-1">
          <Link href={"/messages"}>
            <TooltipButton tooltip="Maximize">
              <Button
                onClick={() => {
                  close();
                  setSelectedChat("");
                }}
                variant={"ghost"}
                className="p-1 rounded-full w-7 h-7 group"
              >
                <Maximize className="w-full h-full text-white transition group-hover:text-slate-600" />
              </Button>
            </TooltipButton>
          </Link>
          <TooltipButton tooltip="Minimize">
            <Button
              onClick={() => {
                close();
                setSelectedChat("");
              }}
              variant={"ghost"}
              className="p-1 rounded-full w-7 h-7 group"
            >
              <MinusSquare className="w-full h-full text-white transition group-hover:text-slate-600" />
            </Button>
          </TooltipButton>
        </div>
      </header>
      <main className="flex flex-1 w-full h-full overflow-hidden">
        <MiniChatDrawer
          selectedChat={selectedChat}
          handleSelectChat={handleSelectChat}
        />
        {selectedChat === "" ? (
          <section className="flex flex-col items-center justify-center flex-1 w-full bg-slate-200">
            <span className="text-xl font-semibold">No Chat Selected</span>
          </section>
        ) : (
          <MiniChatMessages />
        )}
      </main>
    </section>
  );
};

export default OpenMiniChat;
