"use client";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// UI
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import UserProfile from "./user-profile";
import ChildrenProfile from "./children-profile";

const SettingsComponent = () => {
  const { toast } = useToast();
  const [isEditting, setIsEditting] = useState<boolean>(false);

  function confirmChange() {
    setIsEditting(false);
    toast({
      variant: "success",
      title: "Successfully Updated",
      description: "Settings have been updated",
    });
  }
  return (
    <section className="flex flex-col w-full h-full">
      <header className="w-full h-40 bg-main-300"></header>
      <main className="relative flex flex-col flex-1 w-full p-4 bg-white">
        <div className="absolute w-40 h-40 rounded-full shadow-md left-4 -top-12 outline outline-white">
          <Avatar className="w-full h-full">
            <AvatarImage
              className=""
              src={
                "https://images.pexels.com/photos/18903723/pexels-photo-18903723/free-photo-of-girl-in-the-forest.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              }
              alt="profile"
            />
            <AvatarFallback>{"KB"}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-center justify-between w-full pl-44">
          <div className="flex flex-col">
            <div className="text-4xl font-bold">Kielo Mercado</div>
            <span className="">kielo@gmail.com</span>
          </div>
          {isEditting ? (
            <div className="flex gap-2">
              <Button onClick={() => setIsEditting(false)} variant={"outline"}>
                Cancel
              </Button>
              <Button
                onClick={confirmChange}
                className="bg-black hover:bg-slate-600"
              >
                Confirm Changes
              </Button>
            </div>
          ) : (
            <>
              <Button onClick={() => setIsEditting(true)} variant={"outline"}>
                Edit Profile
              </Button>
            </>
          )}
        </div>
        <UserProfile />
        <Separator className="my-2" />
        <ChildrenProfile />
        <Separator className="my-2" />
      </main>
    </section>
  );
};

export default SettingsComponent;
