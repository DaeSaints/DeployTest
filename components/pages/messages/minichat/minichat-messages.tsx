"use client";
import React, { useEffect, useRef, useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Image, SendIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import MiniSingleMessage from "./minichat-single-message";

const MiniChatMessages = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MessagesEndRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageUpload(file);
    }
  };
  useEffect(() => {
    if (MessagesEndRef.current) {
      MessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return () => {};
  }, []);
  return (
    <section className="flex flex-col flex-1 w-full bg-white">
      <header className="flex items-center justify-between w-full px-4 h-14 bg-main-300">
        <span className="font-bold">
          Kielo Mercado <span className="text-sm font-normal">(Parent)</span>
        </span>
      </header>
      <main className="flex flex-col flex-1">
        <div className="flex-1">
          <ScrollArea className="w-full h-[16rem] p-2">
            <div className="flex flex-col gap-2">
              <MiniSingleMessage
                side="Me"
                date={new Date("12/2/2023")}
                today={new Date()}
                content="deeply worth alike along snow sad score write system climate lead sitting mirror everyone pipe settle facing lady trouble tank heart raw political luck"
              />
              <MiniSingleMessage
                side="Me"
                date={new Date("12/2/2023")}
                today={new Date()}
                content="Hello"
              />
              <MiniSingleMessage
                side="Other"
                date={new Date("12/2/2023")}
                today={new Date()}
                content="principle led journey term name spell suggest bad sold usually who according human dish arrange spring automobile closer wolf fill product then bicycle dear"
              />
            </div>
            <div ref={MessagesEndRef} />
          </ScrollArea>
        </div>
        <form className="flex items-center w-full h-16 gap-2 px-2 justify-evenly">
          <Button
            onClick={handleButtonClick}
            type="button"
            variant={"outline"}
            className="p-1 rounded-md w-9 h-9"
          >
            <Image className="w-full h-full" />
            <Input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Button>
          {imageUpload ? (
            <div className="w-full">{imageUpload.name}</div>
          ) : (
            <>
              <Input
                className="flex-1 h-9"
                variant={"transparent"}
                placeholder="Send a message"
              />
            </>
          )}
          <Button className="p-2 rounded-md w-9 h-9">
            <SendIcon className="w-full h-full" />
          </Button>
        </form>
      </main>
    </section>
  );
};

export default MiniChatMessages;
