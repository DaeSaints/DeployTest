import React from "react";
import NavButtons from "./NavButtons";
import SignOutButton from "./SignOutButton";
import { userId } from "@/utils/constants";
import { fetchSingleParentId } from "@/lib/actions/parent.action";

const LeftSidebar = async () => {
  const user = await fetchSingleParentId({ _id: userId });
  return (
    <article className="flex flex-col items-center justify-between flex-1 py-4 bg-main-700">
      <NavButtons user={user}/>
      <SignOutButton />
    </article>
  );
};

export default LeftSidebar;
