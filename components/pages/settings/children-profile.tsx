import React from "react";

// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Image } from "lucide-react";

const ChildrenProfile = () => {
  return (
    <div className="grid w-full grid-flow-row grid-cols-6 my-4">
      <div className="flex flex-col col-span-2">
        <h3 className="text-xl font-bold">Children profile</h3>
        <p className="">Update your children photo and details here.</p>
      </div>
      <div className="flex flex-col col-span-4 gap-8">
        <div className="flex w-full gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={""} alt="profile" />
            <AvatarFallback>
              <Image className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col w-full gap-2">
            <Input
              className="w-2/3"
              variant={"transparent"}
              placeholder="Stan Mercado"
            />
            <Input type="file" className="w-2/3" variant={"transparent"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrenProfile;
