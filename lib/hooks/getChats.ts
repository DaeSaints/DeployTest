"use client";

import { searchChatsAll } from "@/lib/actions/chat.action";
import { ChatType } from "@/lib/interfaces/chat.interface";
import { UserRolesType } from "@/lib/interfaces/user.interface";
import { useQuery } from "@tanstack/react-query";

const useFetchChats = (
  pageNumber = 1,
  pageSize = 10,
  searchFilter = "",
  selectedTab = undefined,
  userId = ""
) => {
  const { data, isLoading } = useQuery({
    queryKey: [`chats`, pageNumber, pageSize, searchFilter, selectedTab],
    enabled: userId !== "",
    queryFn: async () => {
      const { chats } = await searchChatsAll({
        pageNumber,
        pageSize,
        userId,
        search: searchFilter,
        filterRole: selectedTab as UserRolesType | undefined,
      });
      return { chats };
    },
    // refetchInterval: 60000,
  });
  const chats = data?.chats as ChatType[] | undefined;
  return { data: chats, isLoading };
};

export default useFetchChats;