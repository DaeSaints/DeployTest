"use client";

import { fetchParentsSearch } from "@/lib/actions/user.action";
import { useQuery } from "@tanstack/react-query";

const useFetchNewChats = (searchFilter = "") => {
  const { data, isLoading } = useQuery({
    queryKey: [`chats:new`, searchFilter],
    queryFn: async () => {
      const data = await fetchParentsSearch(searchFilter);
      return { newChats: data };
    },
  });
  return { data: data?.newChats, isLoading };
};

export default useFetchNewChats;