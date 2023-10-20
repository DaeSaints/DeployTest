import React from "react";
import NavButtons from "./NavButtons";
import SignOutButton from "./SignOutButton";

const LeftSidebar = () => {
  return (
    <article className="flex flex-col items-center justify-between flex-1 py-4 bg-main-700">
      <NavButtons />
      <SignOutButton />
    </article>
  );
};

export default LeftSidebar;
