import NewMessagesBox from "@/components/pages/messages/new-messages-box";
import { PageProps } from "@/lib/interface/page-props.interface";
import React from "react";

const page = ({}: PageProps) => {
  return (
    <>
      <NewMessagesBox />
    </>
  );
};

export default page;
