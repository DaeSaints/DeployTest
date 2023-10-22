"use client";
import React, { useRef, useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { Image, SendIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import SingleMessage from "./single-message";

const MessagesComponent = () => {
  type MessageType = {
    _id: string;
    content: string;
    image: string | undefined;
    date: Date;
    sender: string;
  };
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const today = new Date();
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

  // TEMP VALUES
  const userId = "123";
  const templateData: MessageType[] = [
    {
      _id: "0",
      content:
        "open nest proper muscle wait sitting die fence she tears partly force cream seen available manufacturing fall notice yard frequently brass build trap as",
      image: "https://github.com/shadcn.png",
      date: new Date("12 / 25 / 2053"),
      sender: "123",
    },
    {
      _id: "1",
      content: "Hello new user",
      image: "https://github.com/shadcn.png",
      date: new Date("7/26/2052"),
      sender: "123",
    },
    {
      _id: "2",
      content:
        "form recall curious hurt rhyme remember mighty recently salt slightly bush sound easily fear vapor danger seven ask solution gather choose phrase promised ten",
      image:
        "https://images.pexels.com/photos/3656518/pexels-photo-3656518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: new Date("3/20/2051"),
      sender: "321",
    },
    {
      _id: "3",
      content:
        "including cold differ known own reader beat lesson cat school porch breathe colony disappear noise smell please same moving sport sang pull growth mental",
      image:
        "https://images.pexels.com/photos/3656518/pexels-photo-3656518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: new Date("3/31/2062"),
      sender: "321",
    },
    {
      _id: "3",
      content:
        "ordinary invented bark last information roar principal fresh chart act diameter blow exist calm was back excited congress center circus cup verb sweet inside",
      image:
        "https://images.pexels.com/photos/3656518/pexels-photo-3656518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: new Date("8/24/2032"),
      sender: "321",
    },
    {
      _id: "4",
      content:
        "remarkable storm halfway voyage smell neighborhood song height wood you think angry here affect boy bare pick skin quite port ahead husband look score",
      image: "https://github.com/shadcn.png",
      date: new Date("7/17/2062"),
      sender: "123",
    },
    {
      _id: "5",
      content:
        "youth beyond teach smoke indicate given bad five roar composition congress driver complex sand quietly correct article came fuel game rather method fewer newspaper",
      image:
        "https://images.pexels.com/photos/3656518/pexels-photo-3656518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: new Date("1/2/2046"),
      sender: "321",
    },
    {
      _id: "6",
      content:
        "firm unless neighbor eventually black heading hollow parallel other vessels coat thin carbon climate mysterious needed fifteen apartment sport education horn realize own huge",
      image: "https://github.com/shadcn.png",
      date: new Date("4/15/2031"),
      sender: "123",
    },
  ];

  return (
    <section className="flex flex-col flex-1 w-full h-full py-2 bg-slate-100">
      <header className="flex items-center justify-between w-full h-24 px-6 pt-4 pb-6 border-b border-slate-400">
        <h2 className="text-lg font-medium">
          Kielo Mercado <span className="text-sm font-normal">(Parent)</span>
        </h2>
      </header>
      <main className="flex flex-col flex-1 w-full">
        <div className="flex items-center justify-center flex-1 w-full overflow-hidden">
          <ScrollArea className="w-full h-[34.2rem] p-4">
            <div className="flex flex-col w-full h-full gap-3">
              {templateData.map((message) => {
                const side = message.sender === userId ? "Me" : "Other";
                return (
                  <SingleMessage
                    key={message._id}
                    today={today}
                    side={side}
                    image={message.image}
                    date={message.date}
                    content={message.content}
                  />
                );
              })}
            </div>
          </ScrollArea>
        </div>
        <form className="flex items-center w-full gap-2 px-2 pt-2">
          <Button
            onClick={handleButtonClick}
            type="button"
            variant={"ghost"}
            className="w-10 h-10 p-1 rounded-md hover:bg-white"
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
              <Input variant={"transparent"} placeholder="Send a message" />
            </>
          )}
          <Button className="w-10 h-10 p-2 rounded-md">
            <SendIcon className="w-full h-full" />
          </Button>
        </form>
      </main>
    </section>
  );
};

export default MessagesComponent;
