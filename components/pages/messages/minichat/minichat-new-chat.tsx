import React from "react";

// UI
import { User2Icon } from "lucide-react";

const MiniChatNewChat = () => {
  return (
    <li className="w-full">
      <div
        className={`flex items-center justify-start w-full py-4 gap-2 px-4 h-20 transition border-b bg-main-200`}
      >
        <div className="relative w-10 h-10 p-2 overflow-hidden rounded-full bg-slate-200">
          <User2Icon className="w-full h-full text-slate-400" />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex items-center justify-between flex-1 gap-4">
            <span className="flex-[4] text-sm font-bold text-left capitalize line-clamp-1">
              New User
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MiniChatNewChat;
