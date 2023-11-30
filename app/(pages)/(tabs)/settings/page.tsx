import { PageProps } from "@/lib/interfaces/page.props";
import { UserType } from "@/lib/interfaces/user.interface";
import { authOptions } from "@/utils/authOptions";
import { isParent } from "@/utils/helpers/isParent";
import { getServerSession } from "next-auth";
import SettingsComponent from "@/components/pages/settings/component";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

const page = async ({ searchParams }: PageProps) => {
  const session = await getServerSession(authOptions);
  const user: UserType = session?.user as UserType;
  user.role = 'parent'

  // console.log("USER ROLE",user.role)
  console.log(session?.user)
console.log(isParent(user));
  if (!user) return null;
  return (
    <>
      <Toaster />
      <SettingsComponent />
    </>
  );
};

export default page;
