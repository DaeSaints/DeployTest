"use client";
import React, { useState } from "react";

// UI
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// BACKEND
import useFetchNewChats from "@/lib/hooks/getNewChats";
import useDebounce from "@/lib/hooks/useDebounce";
import SendBox from "./send-box";
import { useSession } from "next-auth/react";
import { UserType } from "@/lib/interfaces/user.interface";
import NewSendBox from "./new-send-box";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/Loader";


const NewMessagesBox = () => {
  const [openSearchOptions, setOpenSearchOptions] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  // //   TEMPS
  // const isLoading = false;
  // const data: any[] = [];
  // const ACCESSABLE_ROLES = [
  //   "Teacher",
  //   "Parent",
  //   "General Manager",
  //   "Customer Support",
  // ];
  const debouncedSearch = useDebounce(value, 500);

  const ACCESSABLE_ROLES = [
    "Teacher",
    "Parent",
    "General Manager",
    "Customer Support",
  ];

  const { data, isLoading } = useFetchNewChats(debouncedSearch);
  const { data: session } = useSession();
  const userInfo: UserType = session?.user as UserType;

  if (!userInfo) return null;

  return (
    <section className="flex flex-col items-start justify-start flex-1 w-full h-full bg-white">
      <header className="flex items-center justify-start w-full h-24 gap-2 p-4 mt-2 border-b border-slate-300">
        <span className="mr-2 text-lg">To: </span>
        <div className="relative w-full">
          {value !== "" && (
            <Button
              type="button"
              onClick={() => setValue("")}
              variant={"icon"}
              size={"icon"}
              className="absolute right-4 bottom-1/2 translate-y-1/2 p-2"
            >
              <X />
            </Button>
          )}
          <Input
            // variant={"transparent"}
            className="text-lg bg-transparent border-transparent"
            value={value}
            placeholder="Who you want to chat with?"
            onChange={(e) => setValue(e.target.value)}
            onClick={() => {
              setOpenSearchOptions((prev) => !prev);
            }}
          />
          {openSearchOptions && (
            <ul className="absolute left-0 flex flex-col w-full max-w-sm text-base bg-white border rounded-lg shadow-sm top-full">
              {isLoading ? (
                <li className="flex items-center justify-center w-full px-4 py-2">
                  <Loader />
                </li>
              ) : (
                <>
                  {data && data.length > 0 ? (
                    <>
                      {data.map((res) => {
                        return (
                          <li
                            className="flex items-center justify-between w-full px-4 py-2 cursor-pointer hover:bg-slate-200"
                            key={res._id}
                            onClick={() => {
                              setValue(res.email);
                              //   getChat(res._id as string, res);
                              setOpenSearchOptions(false);
                            }}
                          >
                            <span className="text-sm">{res.email}</span>
                            <span className="text-xs text-right capitalize text-slate-400">
                              {/* {(!isParent(res) && res.role) || "Parent"} */}
                            </span>
                          </li>
                        );
                      })}
                    </>
                  ) : (
                    <li className="w-full p-2 text-center">
                      No results with that email
                    </li>
                  )}
                </>
              )}
            </ul>
          )}
        </div>
        <div className="">
          <Select onValueChange={(e) => setSelectedRole(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Recipient Role" />
            </SelectTrigger>
            <SelectContent>
              {ACCESSABLE_ROLES.map((role) => {
                return (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </header>
      <main className="flex-1 w-full flex flex-col">
        <section className="flex-1"></section>
        {value && (
          <NewSendBox
            senderId={userInfo?._id as string}
            recipientEmail={value}
          />
        )}
      </main>
    </section>
  );
};

export default NewMessagesBox;