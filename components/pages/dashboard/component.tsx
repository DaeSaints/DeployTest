"use client";
import useFetchImage from "@/lib/hooks/useFetchImage";
import { UserType } from "@/lib/interfaces/user.interface";
import Image from "next/image";
import React from "react";

const DashboardComponent = ({ user }: { user: UserType }) => {
  const image = useFetchImage(user.profileURL as string);
  return (
    <div>
      {user?.profileURL}{" "}
      <Image src={image} alt="profile pic" width={300} height={300} />
    </div>
  );
};

export default DashboardComponent;
