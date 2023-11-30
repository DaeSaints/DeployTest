"use client";

import { SendHorizonal } from "lucide-react";
import React, { FormEvent, useState } from "react";

// UI
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// FORM
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
const FormSchema = z.object({
  message: z.string().min(2),
});

// BACKEND
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createNewChat } from "@/lib/actions/chat.action";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pusher";


const NewSendBox = ({
  role,
  recipientEmail,
  senderId,
}: {
  role: string;
  recipientEmail: string;
  senderId: string;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [toSendMessage, setToSendMessage] = useState<string>("");

async function handleSendMessage() {
  try {
    console.log(senderId, recipientEmail, role);

    const { data: chatId, success, message } = await createNewChat({
      senderId,
      recipientEmail,
      role,
    });

    console.log("Chat creation result:", message);

    if (success) {
      sendMessageMutation.mutate(chatId);

      return chatId;
    } else {
      console.error("Error creating chat:", message);

      throw new Error(message);
    }
  } catch (error) {
    console.error("Error handling send message:", error);
    throw error; 
  }
}

  // FORM
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  const sendMessage = async (chatId: string) => {
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
    return res.data.data;
  };

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`chats`],
      });
      setToSendMessage("");
      form.reset();
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const {message} = data;
    setToSendMessage(message);
    console.log(setToSendMessage);
    try {

      const chatId = await handleSendMessage();
      console.log(chatId)
      router.push(`/messages/${chatId}`);
    
    } catch (error) {
      console.error("Error sending message:", error);
    }

  }

  return (
    <div className="w-full h-16 flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 w-full px-4 py-2"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="h-10 w-full"
                    placeholder="Enter message"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={
              form.getValues("message") === "" || form.formState.isSubmitting
            }
            className="rounded-lg h-10 aspect-square p-2"
          >
            <SendHorizonal />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewSendBox;