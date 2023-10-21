import React from "react";

// UI
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ChatsDrawer from "./chats-drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

const MessagesDrawer = () => {
  return (
    <article className="flex flex-col w-[20rem] py-2 bg-main-700/80 drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]">
      <header className="w-full h-24 px-4 pt-4 pb-6 border-b border-white/30">
        <div className="relative w-full h-12">
          <span className="absolute bottom-0 -translate-y-1/2 left-4">
            <Search className="w-6 h-6 text-white" />
          </span>
          <Input
            variant={"transparent"}
            className="h-full pl-12 text-sm text-white border-none rounded-full outline-none bg-main-400 placeholder:text-white/80"
            placeholder="Search"
          />
        </div>
      </header>
      <main className="flex flex-col flex-1 w-full h-full">
        <div className="flex items-center justify-center flex-1 w-full overflow-hidden">
          <ScrollArea className="w-full h-[36rem]">
            <div className="flex flex-col w-full h-full gap-3">
              <ChatsDrawer />
            </div>
          </ScrollArea>
        </div>
      </main>
    </article>
  );
};

export default MessagesDrawer;
