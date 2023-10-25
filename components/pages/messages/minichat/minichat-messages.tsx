import React from "react";

// BACKEND
import { ChatType } from "@/lib/interfaces/chat.interface";
import { UserRolesType, UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import MiniChatSendMessage from "./minichat-send-message";
import MiniChatMessagesDisplay from "./minichat-messages-display";
import { MessageType } from "@/lib/interfaces/message.interface";

const MiniChatMessages = ({
  chat,
  userId,
  initialMessages,
}: {
  chat: ChatType;
  userId: string;
  initialMessages: MessageType[];
}) => {
  const recipient: UserType | ParentType = chat.users.find(
    (d) => d._id !== userId
  ) as UserType | ParentType;
  const sender: UserType | ParentType = chat.users.find(
    (d) => d._id === userId
  ) as UserType | ParentType;
  console.log(chat)

  // @ts-ignore
  const recipientRole: UserRolesType = recipient.role || "parent";
  const chatId = chat._id as string;

  return (
    <section className="flex flex-col flex-1 w-full bg-white">
      <header className="flex items-center justify-between w-full px-4 h-14 bg-main-300">
        <span className="font-bold capitalize">
          {recipient.name}
          <span className="text-sm font-normal capitalize">
            ({recipientRole})
          </span>
        </span>
      </header>
      <main className="flex flex-col flex-1">
        <MiniChatMessagesDisplay
          chat={chat}
          userId={userId}
          initialMessages={initialMessages}
          senderImage={sender.profileURL || ""}
          senderName={sender.name}
        />
        <MiniChatSendMessage chatId={chatId} senderId={userId} />
      </main>
    </section>
  );
};

export default MiniChatMessages;
