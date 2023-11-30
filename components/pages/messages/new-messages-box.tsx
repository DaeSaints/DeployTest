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
import { useQuery } from "@tanstack/react-query";
import { fetchbyRole, fetchParentsSearch, fetchUsersSearch } from "@/lib/actions/user.action";
import { isParent } from "@/utils/helpers/isParent";


const NewMessagesBox = ({ user }: { user: UserType }) => {



  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [openSearchOptions, setOpenSearchOptions] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  const userId = user?._id || "";
  const debouncedSearch = useDebounce(value, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["search:chat", debouncedSearch, roleFilter],
    queryFn: async () => {
      const { users } = await fetchParentsSearch(value, userId);
      console.log(users);
      return users;
    },
  });
  let ACCESSABLE_ROLES: string[] = [];

  if(isParent(user)){
  ACCESSABLE_ROLES = [
    "teacher",
    "customer support",
    "sales manager",
    "general manager",
  ];
  } else {
    ACCESSABLE_ROLES = [
      "parent",
    ];
  }

  async function fetchRecipientEmailByRole(role: string) {
    const email = await fetchbyRole({ role })
    console.log(email);
    return email;
  }
  const { data: session } = useSession();
  const userInfo: UserType = session?.user as UserType;

  if (!userInfo) return null;
  if (isParent(user)) {
    return (
      <section className="flex flex-col items-start justify-start flex-1 w-full h-full bg-white">
        <header className="flex items-center justify-start w-full h-24 gap-2 p-4 mt-2 border-b border-slate-300">
          <span className="mr-2 text-lg">To: </span>
          <div className="relative w-full">

            <Select onValueChange={(e) => {
              setSelectedRole(e);
              fetchRecipientEmailByRole(e).then((recipientEmail) => {
                setValue(recipientEmail);
              });
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Receipient Role" />
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

          {selectedRole && (

            <NewSendBox
              senderId={userInfo?._id as string}
              recipientEmail={value}
              // @ts-ignore
              role={selectedRole}
            />
          )}
        </main>
      </section>
    );
  } else {
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
            placeholder="Who do you want to chat with?"
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
                              setOpenSearchOptions(false);
                            }}
                          >
                            <span className="text-sm">{res.email}</span>
                            <span className="text-xs text-right capitalize text-slate-400">
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
              <SelectValue placeholder="parent" />
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
            role={selectedRole}
          />
        )}
      </main>
    </section>
  );
  };
};

export default NewMessagesBox;