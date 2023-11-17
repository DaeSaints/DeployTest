"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import { useRouter } from "next/navigation";

type Tabs = "All Messages" | "Unread";
type TabMessagesType = { label: Tabs; value: number };

const MessageTabs = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>("All Messages");
  const MESSAGES_TABS: TabMessagesType[] = [
    { label: "All Messages", value: 10 },
    { label: "Unread", value: 2 },
  ];
  const router = useRouter();
  return (
    <article className="flex flex-col w-[14rem] py-2 bg-white">
      <header className="flex items-center justify-between w-full h-24 px-6 pt-4 pb-6">
        <h1 className="text-2xl font-bold text-main-500">Inbox</h1>
        <Button
          variant={"ghost"}
          className="w-6 h-6 p-1 text-main-500 rounded-full"
          onClick={() => {
            router.push("/chats/new");
          }}
        >
          <PenBox className="w-full h-full" />
        </Button>
      </header>
      <main className="flex-1 w-full h-full px-4 pt-2 text-black">
        <ul className="flex flex-col flex-1 w-full h-full">
          {MESSAGES_TABS.map((tab, index) => {
            const isActive =
              tab.label === selectedTab
                ? "bg-main-400 text-white"
                : "hover:bg-main-100";
            return (
              <li className="w-full" key={index}>
                <button
                  className={`text-sm flex items-center justify-between w-full p-2 rounded-md ${isActive} transition`}
                  type="button"
                  onClick={() => setSelectedTab(tab.label)}
                >
                  <div className="">{tab.label}</div>
                  <div className="flex items-center justify-center w-6 h-6 rounded-full">
                    {tab.value}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    </article>
  );
};

export default MessageTabs;
