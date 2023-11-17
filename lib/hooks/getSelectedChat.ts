"use client";

import { fetchChatById } from "@/lib/actions/chat.action";
import { ChatType } from "@/lib/interfaces/chat.interface";
import { useQuery } from "@tanstack/react-query";

const useFetchSelectedChat = (chatId = "") => {
  const { data, isLoading } = useQuery({
    queryKey: [`chats-selected:${chatId}`],
    enabled: chatId !== "",
    queryFn: async () => {
      const { chat } = await fetchChatById({
        chatId,
      });
      return { chat };
    },
  });
  const chat = data?.chat as ChatType;
  return { data: chat, isLoading };
};

export default useFetchSelectedChat;