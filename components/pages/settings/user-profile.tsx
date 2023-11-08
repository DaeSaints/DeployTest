import React from "react";

// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image } from "lucide-react";
import { Input } from "@/components/ui/input";

const UserProfile = () => {
  return (
    <div className="grid w-full grid-flow-row grid-cols-6 mb-4 mt-14">
      <div className="flex flex-col col-span-2">
        <h3 className="text-xl font-bold">User profile</h3>
        <p className="">Update your photo and details here.</p>
      </div>
      <div className="flex flex-col col-span-4 gap-8">
        <div className="flex w-full gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={
                "https://images.pexels.com/photos/18903723/pexels-photo-18903723/free-photo-of-girl-in-the-forest.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              }
              alt="profile"
            />
            <AvatarFallback>
              <Image className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col w-full gap-2">
            <Input
              className="w-2/3"
              variant={"transparent"}
              placeholder="Kielo Mercado"
            />
            <Input type="file" className="w-2/3" variant={"transparent"} />
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="w-24 h-24 mr-2" />
          <div className="flex flex-col w-full gap-2">
            <Input
              className="w-2/3"
              type="password"
              variant={"transparent"}
              placeholder="Old Password"
            />
            <Input
              className="w-2/3"
              type="password"
              variant={"transparent"}
              placeholder="New Password"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
