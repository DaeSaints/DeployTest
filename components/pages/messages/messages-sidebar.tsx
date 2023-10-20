import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import ChatsDrawer from "./chats-drawer";

const SideBarMessages = () => {
  return (
    <article className="flex flex-col w-full max-w-xs py-2 bg-main-700/80">
      <header className="w-full px-4 pt-4 pb-6 border-b border-white/30">
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
        <ChatsDrawer />
      </main>
    </article>
  );
};

export default SideBarMessages;
