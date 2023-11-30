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
import { fetchbyRole, fetchUsersSearch } from "@/lib/actions/user.action";


const NewMessagesBox = ({ userId }: { userId: string }) => {
  


  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [openSearchOptions, setOpenSearchOptions] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  

  const debouncedSearch = useDebounce(value, 500);

  const ACCESSABLE_ROLES = [
    "teacher",
    "customer support",
    "sales manager",
    "general manager",
  ];

  async function fetchRecipientEmailByRole(role:string) {
    const email = await fetchbyRole({role})
    console.log(email);
    return email;
  }
  
  const { data: session } = useSession();
  const userInfo: UserType = session?.user as UserType;

  if (!userInfo) return null;

  return (
    <section className="flex flex-col items-start justify-start flex-1 w-full h-full bg-white">
      <header className="flex items-center justify-start w-full h-24 gap-2 p-4 mt-2 border-b border-slate-300">
        <span className="mr-2 text-lg">To: </span>
        <div className="relative w-full">
        <Select onValueChange={(e) => {setSelectedRole(e);
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
};

export default NewMessagesBox;