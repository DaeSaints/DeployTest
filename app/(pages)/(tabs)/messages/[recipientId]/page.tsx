import MessagesComponent from "@/components/pages/messages/messages-component";
import { PageProps } from "@/lib/interfaces/page.props";
import React from "react";

const page = ({ params, searchParams }: PageProps) => {
  return (
    <>
      <MessagesComponent />
    </>
  );
};

export default page;
