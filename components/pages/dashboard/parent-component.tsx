import { ParentType } from "@/lib/interfaces/parent.interface";
import React from "react";
import NotAcceptedSection from "./parent/not-accepted";
import AcceptedSection from "./parent/accepted";
import { fetchSingleParentId } from "@/lib/actions/parent.action";

const ParentComponent = async ({ userInfo }: { userInfo: ParentType }) => {
  const parent = await fetchSingleParentId({ _id: userInfo._id as string });

  return (
    <section className="flex flex-col w-full h-screen overflow-y-auto bg-white">
      {userInfo.isAccepted ? (
        <>
          <AcceptedSection userInfo={parent} />
        </>
      ) : (
        <>
          <NotAcceptedSection userInfo={parent} />
        </>
      )}
    </section>
  );
};

export default ParentComponent;
