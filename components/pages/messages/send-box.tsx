"use client";

import { SendHorizonal } from "lucide-react";
import React from "react";

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

const SendBox = ({
  senderId,
  chatId,
}: {
  senderId: string;
  chatId: string;
}) => {
  const queryClient = useQueryClient();

  // FORM
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  const sendMessage = async ({
    chatId,
    content,
  }: {
    chatId: string;
    content: string;
  }) => {
    // console.log({
    //   chatId,
    //   content,
    //   senderId,
    // });
    const res = await axios.post("/api/message", {
      chatId,
      content,
      senderId,
    });
    return res.data.data;
  };

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`chats-messages:${chatId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`chats`],
      });
      form.reset();
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { message } = data;
    if (chatId) sendMessageMutation.mutate({ chatId, content: message });
    else {
      console.log({ senderId, chatId });
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

export default SendBox;