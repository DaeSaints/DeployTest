"use client";
import React from "react";

// UI
import SendBox from "./send-box";

// BACKEND
import useFetchMessages from "@/lib/hooks/getMessages";
import { useSession } from "next-auth/react";
import { UserType } from "@/lib/interfaces/user.interface";
import ChatHeader from "./chat-header";
import ChatMessagesDisplay from "./display";

const MessagesComponent = ({ chatId }: { chatId: string }) => {
  const { data: messages, isLoading: isLoadingMessages } = useFetchMessages(
    1,
    20,
    chatId
  );
  const { data: session } = useSession();
  const userInfo = session?.user as UserType;
  if (!userInfo) return null;
  const userId = userInfo?._id as string;

  return (
    <section className="flex flex-col flex-1 py-2 bg-slate-100">
      <ChatHeader userId={userId} chatId={chatId} />
      <main className="flex flex-col flex-1">
        <ChatMessagesDisplay
          chatId={chatId}
          userId={userId}
          initialMessages={messages}
          senderImage={userInfo?.profileURL || ""}
          senderName={userInfo?.name}
        />
        <SendBox chatId={chatId} senderId={userId} />
      </main>
    </section>
  );
};

export default MessagesComponent;
