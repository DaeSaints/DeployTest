"use client";
import React, { useState } from "react";

// UI
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, User2Icon, X } from "lucide-react";

// BACKEND
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/lib/hooks/useDebounce";
import { fetchUsersSearch } from "@/lib/actions/user.action";
import { userId } from "@/utils/constants";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MiniChatSendNewMessage from "./minichat-send-new-message";
import { ChatType } from "@/lib/interfaces/chat.interface";

const MiniChatNewBox = ({
  handleSelectNewChat,
}: {
  handleSelectNewChat: () => void;
}) => {
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [value, setValue] = useState<string>("");
  const debouncedSearch = useDebounce(value, 500);
  const [selectedRecipient, setSelectedRecipient] = useState<
    UserType | ParentType | null
  >(null);

  const { data, isLoading } = useQuery({
    queryKey: ["search:chat", debouncedSearch, roleFilter],
    queryFn: async () => {
      const { users } = await fetchUsersSearch(value, userId, roleFilter);
      return users;
    },
  });
  const BADGE_COLORS = {
    "general manager": "bg-yellow-600",
    teacher: "bg-green-600",
    "": "bg-main-600",
  };

  // @ts-ignore
  const badgeClass = BADGE_COLORS[(selectedRecipient?.role || "") as keyof typeof BADGE_COLORS];

  return (
    <div className="flex flex-col flex-1 w-full">
      <header className="relative flex items-center justify-start w-full gap-2 px-2 bg-main-300 h-14">
        <span className="text-sm">To: </span>

        {selectedRecipient ? (
          <Badge
            className={`${badgeClass} flex items-center justify-center gap-2 px-2 py-1`}
          >
            {selectedRecipient.email}
            <Button
              onClick={() => setSelectedRecipient(null)}
              type="button"
              variant={"ghost"}
              className="w-4 h-4 p-0 rounded-full"
            >
              <X className="w-full h-full" />
            </Button>
          </Badge>
        ) : (
          <>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              className="flex-1 text-sm text-black bg-transparent border-none outline-none placeholder:text-black"
              placeholder="Who do you want to talk to?"
            />
            <Select
              onValueChange={(e) => setRoleFilter(e)}
              defaultValue={roleFilter}
            >
              <SelectTrigger className="w-[8rem]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="All">All</SelectItem>
                  {/* <SelectItem value="Parent">Parent</SelectItem> */}
                  <SelectItem value="general manager">Manager</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <ul className="absolute flex flex-col gap-1 p-1 -mt-2 bg-white rounded-lg shadow w-80 left-8 top-full">
              {isLoading ? (
                <li className="flex items-center justify-center w-full h-10">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </li>
              ) : (
                <>
                  {data && data.length > 0 ? (
                    <>
                      {data?.map((user) => {
                        // @ts-ignore
                        const userRole = user?.role || "parent";
                        return (
                          <button
                            type="button"
                            className="w-full overflow-hidden"
                            key={user._id}
                            onClick={() => {
                              setValue("");
                              // handleNewChat(user.email, userRole);
                              setSelectedRecipient(user);
                            }}
                          >
                            <li className="flex items-center justify-between w-full p-2 text-xs text-left transition hover:bg-slate-200 line-clamp-1">
                              <span className="flex-1 text-left line-clamp-1">
                                {user.email}
                              </span>
                              <span className="w-32 text-right capitalize">
                                {userRole}
                              </span>
                            </li>
                          </button>
                        );
                      })}
                    </>
                  ) : (
                    <li className="flex items-center justify-center w-full h-10">
                      No email found
                    </li>
                  )}
                </>
              )}
            </ul>
          </>
        )}
      </header>

      <main className="flex flex-col flex-1 w-full">
        <div className="flex flex-col items-center justify-center flex-1 w-full gap-2">
          {!selectedRecipient && (
            <>
              <div className="w-24 h-24 p-3 overflow-hidden rounded-full bg-slate-100">
                <User2Icon className="w-full h-full text-slate-400" />
              </div>
              <span className="">Select a new recipient</span>
            </>
          )}
        </div>
        <div className="w-full h-16">
          <MiniChatSendNewMessage
            recipientEmail={(selectedRecipient?.email as string) || ""}
            handleSelectNewChat={handleSelectNewChat}
            // @ts-ignore
            role={selectedRecipient?.role || "parent"}
            senderId={userId}
            disabled={selectedRecipient === null ? true : false}
          />
        </div>
      </main>
    </div>
  );
};

export default MiniChatNewBox;
