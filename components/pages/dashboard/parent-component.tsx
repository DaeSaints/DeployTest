import { ParentType } from "@/lib/interfaces/parent.interface";
import React from "react";
import NotAcceptedSection from "./parent/not-accepted";
import AcceptedSection from "./parent/accepted";

const ParentComponent = ({ userInfo }: { userInfo: ParentType }) => {
  return (
    <>
      {userInfo.isAccepted ? (
        <AcceptedSection userInfo={userInfo} />
      ) : (
        <NotAcceptedSection userInfo={userInfo} />
      )}
    </>
  );
};

export default ParentComponent;
