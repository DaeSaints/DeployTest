"use client";
import React, { FormEvent, useRef, useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { Image, SendIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

// BACKEND
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// UPLOAD THING
import { ourFileRouter } from "@/app/(routes)/api/uploadthing/core";
import { useUploadThing } from "@/lib/uploadthing";

const MiniChatSendMessage = ({
  chatId,
  senderId,
  disabled = false,
}: {
  chatId: string;
  senderId: string;
  disabled?: boolean;
}) => {
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
      isImage: false,
    });
    const res = await axios.post("/api/message", {
      chatId,
      content: toSendMessage,
      senderId,
    });
    console.log(res.data.data);
    return res.data.data;
  };

  const sendMessageWtImageAPI = async (d: string) => {
    const res = await axios.post("/api/message", {
      chatId,
      content: d,
      senderId,
      isImage: true,
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

  const sendMessageWtImageMutation = useMutation({
    mutationFn: (d: string) => {
      return sendMessageWtImageAPI(d);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`minichat:chats-${chatId}:messages`],
      });
      setSelectedFile([]);
    },
  });
  //   FILE
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     setImageUpload(file);
  //   }
  // };

  // FILE UPLOAD
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const { startUpload, isUploading } = useUploadThing("message", {
    onClientUploadComplete: (url) => {
      return url;
    },
  });
  async function sendMessageWtImage() {
    const res = await startUpload(selectedFile);
    if (res) {
      const url = res[0].url;
      sendMessageWtImageMutation.mutate(url);
    }
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex items-center w-full h-16 gap-2 px-2 justify-evenly"
    >
      {selectedFile.length > 0 ? (
        <>
          <div className="flex-1 max-w-[23rem] overflow-hidden line-clamp-1 text-sm">
            {selectedFile[0].name}
          </div>
          <Button
            disabled={isUploading}
            type="button"
            onClick={sendMessageWtImage}
            className="p-2 rounded-md w-9 h-9"
          >
            <SendIcon className="w-full h-full" />
          </Button>
        </>
      ) : (
        <>
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
              // onChange={handleFileChange}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setSelectedFile([file]);
              }}
            />
          </Button>
          <Input
            onChange={(e) => setToSendMessage(e.target.value)}
            value={toSendMessage}
            className="flex-1 h-9"
            variant={"transparent"}
            placeholder="Send a message"
            disabled={disabled}
          />
          <Button
            disabled={toSendMessage === "" ? true : false}
            type="submit"
            className="p-2 rounded-md w-9 h-9"
          >
            <SendIcon className="w-full h-full" />
          </Button>
        </>
      )}
    </form>
  );
};

export default MiniChatSendMessage;
