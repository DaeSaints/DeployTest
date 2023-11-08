import React from "react";
import NavButtons from "./NavButtons";
import SignOutButton from "./SignOutButton";
import { fetchSingleParentId } from "@/lib/actions/parent.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { UserType } from "@/lib/interfaces/user.interface";
import { isParent } from "@/utils/helpers/isParent";

const LeftSidebar = async () => {
  const session = await getServerSession(authOptions);
  const user: UserType = session?.user as UserType;
  let users;
  if(isParent(user)){
    users = await fetchSingleParentId({ _id: user._id });
  } else {
    users = user
  }

  return (
    <article className="flex flex-col items-center justify-between flex-1 py-4 bg-main-700">
      <NavButtons user={users}/>
      <SignOutButton />
    </article>
  );
};

export default LeftSidebar;
