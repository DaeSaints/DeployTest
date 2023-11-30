import NewMessagesBox from "@/components/pages/messages/new-messages-box";
import { PageProps } from "@/lib/interfaces/page.props";
import { UserType } from "@/lib/interfaces/user.interface";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const page = async ({}: PageProps) => {
  const session = await getServerSession(authOptions);
  const user: UserType = session?.user as UserType;
  console.log('here send')
  return (
    <>
    
      <NewMessagesBox user={user} />
    </>
  );
};

export default page;
