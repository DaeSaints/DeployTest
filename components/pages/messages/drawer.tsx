"use client";
import React from "react";

// UI
import { Input } from "@/components/ui/input";
import { PenBox, Search } from "lucide-react";
import ChatsDrawer from "./chats-drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

// BACKEND
import useFetchChats from "@/lib/hooks/getChats";
import { useSession } from "next-auth/react";
import { UserType } from "@/lib/interfaces/user.interface";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const MessagesDrawer = () => {
  const { data } = useSession();
  const router = useRouter();
  const userInfo = data?.user as UserType;
  const { data: chats, isLoading } = useFetchChats(
    1,
    10,
    "",
    undefined,
    userInfo?._id as string
  );
  return (
    <article className="flex flex-col w-[20rem] h-full py-2 bg-white border-r shadow-inner">
      <header className="w-full h-24 px-4 pt-4 pb-6 border-b border-slate-400/30 flex justify-center items-center gap-2">
        <Button
          variant={"ghost"}
          className="w-9 h-9 p-1 text-main-500 rounded-full"
          onClick={() => {
            router.push("/messages/new");
          }}
        >
          <PenBox className="w-full h-full" />
        </Button>
        <div className="relative w-full h-12">
          <span className="absolute bottom-0 -translate-y-1/2 left-4">
            <Search className="w-6 h-6 text-white" />
          </span>
          <Input
            // variant={"transparent"}
            className="h-full pl-12 text-sm text-white border-none rounded-full outline-none bg-main-400 placeholder:text-white/80"
            placeholder="Search"
          />
        </div>
      </header>
      <main className="flex flex-col flex-1 w-full h-full justify-start items-start">
        <div className="flex items-start justify-center flex-1 w-full overflow-hidden">
          <ScrollArea className="w-full h-[70vh]">
            {chats && !isLoading ? (
              <>
                <div className="flex flex-col w-full h-full">
                  <ChatsDrawer data={chats} />
                </div>
              </>
            ) : (
              <div className="flex flex-col w-[20rem] bg-slate-200 animate-pulse">
                <main className="flex flex-col flex-1 w-full h-full">
                  <div className="flex items-center justify-center flex-1 w-full overflow-hidden">
                    <div className="w-full h-[36rem]">
                      <div className="flex flex-col w-full h-full">
                        {Array(5)
                          .fill([])
                          .map((_, index) => {
                            return (
                              <div
                                key={index}
                                className={`w-full px-4 py-5 transition bg-slate-100 animate-pulse group relative`}
                              >
                                <div className="flex items-center justify-between w-full gap-2">
                                  <div className="w-12 h-12 rounded-full bg-slate-200 animate-pulse" />
                                  <div className="flex flex-col items-center justify-center flex-1 w-full p-1 overflow-hidden text-white">
                                    <div className="flex items-center justify-between w-full h-12 bg-slate-200 animate-pulse" />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            )}
          </ScrollArea>
        </div>
      </main>
    </article>
  );
};

export default MessagesDrawer;