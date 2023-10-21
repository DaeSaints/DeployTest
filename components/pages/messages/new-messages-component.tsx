import React from "react";
import Chat from "@/public/svg/chat.svg";
import Image from "next/image";

const NewMessagesComponent = () => {
  return (
    <section className="flex flex-col items-center justify-center flex-1 w-full h-full gap-10 py-2 bg-white">
      <div className="text-4xl font-bold cursor-default text-main-500">
        No Chat Selected
      </div>
      <Image src={Chat} alt="chat" width={300}/>
    </section>
  );
};

export default NewMessagesComponent;
