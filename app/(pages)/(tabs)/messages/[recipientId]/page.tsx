import MessagesComponent from "@/components/pages/messages/messages-component";
import { PageProps } from "@/lib/interfaces/page.props";
import React from "react";

const page = ({ params, searchParams }: PageProps) => {
  const chatId = params.recipientId || "";
  if (chatId === "") return null;

  return (
    <>
      <MessagesComponent chatId={chatId as string} />
    </>
  );
};

export default page;
