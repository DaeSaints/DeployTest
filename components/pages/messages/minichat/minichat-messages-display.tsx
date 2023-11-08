"use client";
import React, { useEffect, useRef, useState } from "react";

// UI
import { ScrollArea } from "@/components/ui/scroll-area";
import MiniSingleMessage from "./minichat-single-message";

// BACKEND
import { pusherClient } from "@/lib/pusher";
import { MessageType } from "@/lib/interfaces/message.interface";
import { ChatType } from "@/lib/interfaces/chat.interface";
import { useQueryClient } from "@tanstack/react-query";

const MiniChatMessagesDisplay = ({
  chat,
  userId,
  initialMessages,
  senderImage,
  senderName,
}: {
  chat: ChatType;
  userId: string;
  initialMessages: MessageType[];
  senderImage: string;
  senderName: string;
}) => {
  const chatId = chat._id as string;
  const MessagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // const [incomingMessages, setIncomingMessages] = useState<MessageType[]>([]);
  React.useEffect(() => {
    if (MessagesEndRef.current) {
      MessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    pusherClient.subscribe(chatId);

    pusherClient.bind("incoming-message", (newMessage: MessageType) => {
      queryClient.invalidateQueries({
        queryKey: [`minichat:chats-${chatId}:messages`],
      });
    });
    return () => {
      pusherClient.unsubscribe(chatId);
    };
  }, []);

  useEffect(() => {
    if (MessagesEndRef.current) {
      MessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return () => {};
  }, [initialMessages]);
  return (
    <>
      <div className="flex-1">
        <div>
          <ScrollArea className="w-full h-[16rem] p-2">
            <div className="flex flex-col-reverse gap-2">
              {/* <div className="flex flex-col-reverse gap-2">
                {incomingMessages.map((message) => {
                  const side = message.sender._id === userId ? "Me" : "Other";

                  return (
                    <MiniSingleMessage
                      key={message._id as string}
                      side={side}
                      date={message.createdAt}
                      today={new Date()}
                      content={message.content}
                    />
                  );
                })}
              </div> */}
              {initialMessages?.map((message) => {
                const side = message.sender._id === userId ? "Me" : "Other";

                return (
                  <MiniSingleMessage
                    key={message._id as string}
                    side={side}
                    date={message.createdAt}
                    today={new Date()}
                    content={message.content}
                    senderImage={senderImage}
                    senderName={senderName}
                    isImage={message.isImage}
                  />
                );
              })}
            </div>
            <div ref={MessagesEndRef} />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default MiniChatMessagesDisplay;
