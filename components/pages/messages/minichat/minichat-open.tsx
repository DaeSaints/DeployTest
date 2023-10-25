"use client";
import React, { useState } from "react";
import Link from "next/link";

// UI
import TooltipButton from "@/components/global/TooltipButton";
import { Button } from "@/components/ui/button";
import { Loader2, Maximize, MinusSquare } from "lucide-react";

import MiniChatMessages from "./minichat-messages";
import MiniChatDrawer from "./minichat-drawer";
import { ChatType } from "@/lib/interfaces/chat.interface";

// BACKEND
import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "@/lib/actions/message.action";
import { MessageType } from "@/lib/interfaces/message.interface";
import MiniChatNewBox from "./minichat-new";

const OpenMiniChat = ({ close }: { close: () => void }) => {
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
  const [toggleNewChat, setToggleNewChat] = useState<boolean>(false);

  function handleNewChat() {
    setToggleNewChat(true);
    if (selectedChat) setSelectedChat(null);
  }
  function handleSelectChat(chatSelected: ChatType | null) {
    if (toggleNewChat) setToggleNewChat(false);
    setSelectedChat(chatSelected);
  }
  const userId = "65176d6b9ce0272c671d6583";

  const chatId = selectedChat?._id as string;

  const { data: messages, isLoading } = useQuery({
    queryKey: [`minichat:chats-${chatId}:messages`],
    enabled: chatId != null,
    queryFn: async () => {
      const { messages } = await fetchMessages({
        pageNumber: 1,
        pageSize: 20,
        chatId,
      });
      return messages;
    },
  });

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
                  setSelectedChat(null);
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
                setSelectedChat(null);
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
          toggleNewChat={toggleNewChat}
          handleNewChat={handleNewChat}
          selectedChat={selectedChat}
          handleSelectChat={handleSelectChat}
        />
        {toggleNewChat ? (
          <MiniChatNewBox />
        ) : (
          <>
            {!selectedChat ? (
              <section className="flex flex-col items-center justify-center flex-1 w-full bg-slate-200">
                <span className="text-xl font-semibold">No Chat Selected</span>
              </section>
            ) : (
              <>
                {messages ? (
                  <MiniChatMessages
                    chat={selectedChat}
                    userId={userId}
                    initialMessages={messages as MessageType[]}
                  />
                ) : (
                  <div className="flex items-center justify-center flex-1 w-full">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </section>
  );
};

export default OpenMiniChat;
