"use client";
import React, { FormEvent, useRef, useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { Image, SendIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

// BACKEND
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const MiniChatSendMessage = ({
  chatId,
  senderId,
}: {
  chatId: string;
  senderId: string;
}) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toSendMessage, setToSendMessage] = useState<string>("");
  const queryClient = useQueryClient();
  function handleSendMessage(e: FormEvent) {
    console.log({
      chatId,
      content: toSendMessage,
      senderId,
    });
    e.preventDefault();
    sendMessageMutation.mutate();
  }
  const sendMessage = async () => {
    console.log({
      chatId,
      content: toSendMessage,
      senderId,
    });
    const res = await axios.post("/api/message", {
      chatId,
      content: toSendMessage,
      senderId,
    });
    console.log(res.data.data);
    return res.data.data;
  };

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`minichat:chats-${chatId}:messages`],
      });
      setToSendMessage("");
    },
  });
  //   FILE
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

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex items-center w-full h-16 gap-2 px-2 justify-evenly"
    >
      {/* <Button
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
      </Button> */}
      {imageUpload ? (
        <div className="w-full">{imageUpload.name}</div>
      ) : (
        <>
          <Input
            onChange={(e) => setToSendMessage(e.target.value)}
            value={toSendMessage}
            className="flex-1 h-9"
            variant={"transparent"}
            placeholder="Send a message"
          />
        </>
      )}
      <Button
        disabled={toSendMessage === "" ? true : false}
        type="submit"
        className="p-2 rounded-md w-9 h-9"
      >
        <SendIcon className="w-full h-full" />
      </Button>
    </form>
  );
};

export default MiniChatSendMessage;
