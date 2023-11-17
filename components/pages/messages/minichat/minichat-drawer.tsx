"use client";
import React, { useState } from "react";

// UI
import { ScrollArea } from "@/components/ui/scroll-area";
import MiniChatSingleChat from "./minichat-single-chat";
import { Input } from "@/components/ui/input";
import { Loader2, PenBoxIcon, Search } from "lucide-react";

// BACKEND
import { searchChatsAll } from "@/lib/actions/chat.action";
import { useQuery } from "@tanstack/react-query";
import { UserRolesType, UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { ChatType } from "@/lib/interfaces/chat.interface";
import { pusherClient } from "@/lib/pusher";
import { Button } from "@/components/ui/button";
import MiniChatNewChat from "./minichat-new-chat";
import useDebounce from "@/lib/hooks/useDebounce";

const MiniChatDrawer = ({
  toggleNewChat,
  selectedChat,
  handleNewChat,
  handleSelectChat,
  userId,
}: {
  userId: string;
  toggleNewChat: boolean;
  selectedChat: ChatType | null;
  handleSelectChat: (temp: ChatType | null) => void;
  handleNewChat: () => void;
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 500);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`minichat:chats`, debouncedSearch],
    queryFn: async () => {
      const { chats } = await searchChatsAll({
        pageNumber: 1,
        pageSize: 20,
        userId,
        search: debouncedSearch,
        filterRole: undefined,
      });
      return chats;
    },
  });

  React.useEffect(() => {
    pusherClient.subscribe(userId);

    pusherClient.bind("fetch-chats", () => {
      refetch();
    });
    return () => {
      pusherClient.unsubscribe(userId);
    };
  }, []);

  return (
    <div className="w-[17rem] h-full flex flex-col">
      <div className="relative flex items-center justify-between w-full gap-2 px-2 border-b h-14">
        <Button
          type="button"
          className="w-8 h-8 p-1"
          variant={"ghost"}
          onClick={handleNewChat}
        >
          <PenBoxIcon className="w-full h-full" />
        </Button>
        <Search className="absolute w-5 h-5 -translate-y-1/2 bottom-2 left-12" />
        <Input
          variant={"transparent"}
          placeholder="Search..."
          className="pl-8 border-b-2 border-transparent rounded-none border-b-slate-200"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <ScrollArea className="flex flex-1 w-full">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex flex-1 w-full h-full">
              <ul className="flex flex-col flex-1 border-r">
                {toggleNewChat && <MiniChatNewChat />}
                {data && data?.length > 0 ? (
                  <>
                    {data?.map((chat) => {
                      const _id = chat._id as string;
                      const active = selectedChat?._id === _id;
                      const recipient: UserType | ParentType = chat.users.find(
                        (d) => d._id !== userId
                      ) as UserType | ParentType;

                      // @ts-ignore
                      let recipientRole: UserRolesType =
                        //@ts-ignore
                        recipient.role || "parent";
                      return (
                        <MiniChatSingleChat
                          key={_id}
                          _id={_id}
                          chat={chat}
                          active={active}
                          handleSelectChat={handleSelectChat}
                          name={recipient?.name as string}
                          latestContent={chat.latestMessage.content}
                          recipientRole={recipientRole}
                        />
                      );
                    })}
                  </>
                ) : (
                  <li className="flex items-center justify-center flex-1 w-full mt-4">
                    No chats found
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </ScrollArea>
    </div>
  );
};

export default MiniChatDrawer;
