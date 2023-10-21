"use client";
import React, { useState } from "react";

// UI
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NewMessagesBox = () => {
  const [openSearchOptions, setOpenSearchOptions] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  //   TEMPS
  const isLoading = false;
  const data: any[] = [];
  const ACCESSABLE_ROLES = [
    "Teacher",
    "Parent",
    "General Manager",
    "Customer Support",
  ];
  return (
    <section className="flex flex-col items-start justify-start flex-1 w-full h-full bg-white">
      <header className="flex items-center justify-start w-full h-24 gap-2 p-4 mt-2 border-b border-slate-300">
        <span className="mr-2 text-lg">To: </span>
        <div className="relative w-full">
          <Input
            variant={"transparent"}
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
                  <Loader2 className="w-5 h-5 animate-spin" />
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
      <main className="flex-1 w-full"></main>
    </section>
  );
};

export default NewMessagesBox;
