import NewMessagesBox from "@/components/pages/messages/new-messages-box";
import { PageProps } from "@/lib/interfaces/page.props";
import React from "react";

const page = ({}: PageProps) => {
  return (
    <>
      <NewMessagesBox />
    </>
  );
};

export default page;
