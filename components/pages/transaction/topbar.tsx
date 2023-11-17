"use client";
import React, { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useTabContext } from "./tabcontext";


const TransactionTopBar = () => {
  
  const TABS = ["All", "Pending", "Paid", "Cancelled"] as const;
  const { selectedTab, changeTab } = useTabContext();
  return (
    <header className="flex flex-col justify-center w-full h-32 gap-1 px-4 bg-white">
      <div className="text-2xl font-bold text-main-700">Transactions</div>
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-4">
          <div className="relative flex items-center justify-center px-4 border rounded-lg">
            <Search className="absolute bottom-0 w-5 h-5 -translate-y-1/2 left-2 text-slate-500" />
            <input
              placeholder="Search..."
              className="w-64 h-10 pl-6 border-none outline-none"
            />
          </div>
        </div>
        <div className="flex p-2 rounded-lg w-fit bg-slate-100">
          {TABS.map((tab) => {
            const activeClass =
              selectedTab === tab
                ? "bg-white shadow text-black font-semibold rounded-lg"
                : "";
            return (
              <Button
                key={tab}
                type="button"
                onClick={() => changeTab(tab)}
                variant={"ghost"}
                className={`text-slate-500 hover:bg-white ${activeClass}`}
              >
                {tab}
              </Button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default TransactionTopBar;
