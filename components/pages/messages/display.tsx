"use client";
import React, { useEffect, useRef } from "react";

// UI
import { ScrollArea } from "@/components/ui/scroll-area";

// BACKEND
import { pusherClient } from "@/lib/pusher";
import { MessageType } from "@/lib/interfaces/message.interface";
import { useQueryClient } from "@tanstack/react-query";
import SingleMessage from "./single-message";
import useFetchSelectedChat from "@/lib/hooks/getSelectedChat";

const ChatMessagesDisplay = ({
  chatId,
  userId,
  initialMessages,
  senderImage,
  senderName,
}: {
  chatId: string;
  userId: string;
  initialMessages: MessageType[];
  senderImage: string;
  senderName: string;
}) => {
  const MessagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: selectedChat, isLoading: isLoadingSelectedChat } =
    useFetchSelectedChat(chatId);
  const recipient = selectedChat?.users?.find((d) => d._id !== userId);

  // const [incomingMessages, setIncomingMessages] = useState<MessageType[]>([]);
  React.useEffect(() => {
    if (MessagesEndRef.current) {
      MessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    pusherClient.subscribe(chatId);

    pusherClient.bind("incoming-message", (newMessage: MessageType) => {
      queryClient.invalidateQueries({
        queryKey: [`chats-messages:${chatId}:messages`],
      });
      queryClient.invalidateQueries({
        queryKey: [`chats`],
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
    <div className="">
      <div className="w-full h-full ">
        <ScrollArea className="w-full flex flex-col-reverse h-[66vh] p-2">
          <div className="flex flex-col-reverse gap-2 h-full overflow-hidden">
            {initialMessages?.map((message) => {
              const side = message.sender._id === userId ? "Me" : "Other";

              return (
                <div className="py-1">
                  <SingleMessage
                    key={message._id as string}
                    side={side}
                    date={message.createdAt}
                    today={new Date()}
                    content={message.content}
                    senderImage={
                      side === "Me"
                        ? senderImage
                        : (recipient?.profileURL as string)
                    }
                    senderName={
                      side === "Me" ? senderName : (recipient?.name as string)
                    }
                    isImage={false}
                  />
                </div>
              );
            })}
          </div>
          <div ref={MessagesEndRef} />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ChatMessagesDisplay;