import React from "react";
import NavButtons from "./NavButtons";
import SignOutButton from "./SignOutButton";
import { userId } from "@/utils/constants";
import { fetchSingleParentId } from "@/lib/actions/parent.action";

const LeftSidebar = async () => {
  const user = await fetchSingleParentId({ _id: userId });
  return (
    <article className="fixed top-0 left-0 flex flex-col items-center justify-between w-16 h-screen px-2 py-4 z-[100] bg-main-700">
      <NavButtons user={user}/>
      <SignOutButton />
    </article>
  );
};

export default LeftSidebar;
