import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import React from "react";

const SingleChat = () => {
  return (
    <button
      type="button"
      className="w-full px-4 py-5 transition border-b border-white/30 group hover:bg-white/10"
    >
      <div className="flex items-center justify-between w-full gap-2">
        <div className="relative w-12 h-12 bg-white rounded-full"></div>
        <div className="flex flex-col items-center justify-center flex-1 w-full p-1 overflow-hidden text-white">
          <div className="flex items-center justify-between w-full">
            <span className="font-medium">Matt Thimpson</span>
            <Button variant={"ghost"} className="w-6 h-6 p-1 rounded-full">
              <MoreHorizontal className="w-full h-full" />
            </Button>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="line-clamp-1 max-w-[11.5rem] overflow-hidden text-left text-xs text-slate-300">
              Thanks again for that wonderful
            </p>
            <span className="text-xs text-right text-slate-300">6 min</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default SingleChat;
