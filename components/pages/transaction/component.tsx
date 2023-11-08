"use client";
import React from "react";

// UI
import { ScrollArea } from "@/components/ui/scroll-area";
import TransactionCard from "./card";

const TransactionComponent = () => {
  return (
    <div className="flex flex-1 w-full p-4 pt-14">
      <ScrollArea className="w-full h-[31rem]">
        <div className="flex flex-col w-full h-full gap-4 overflow-hidden">
          {Array(5)
            .fill([])
            .map((_, index) => {
              return <TransactionCard key={index} />;
            })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TransactionComponent;
