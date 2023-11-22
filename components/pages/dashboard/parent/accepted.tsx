import { ParentType } from "@/lib/interfaces/parent.interface";
import React from "react";

const AcceptedSection = ({ userInfo }: { userInfo: ParentType }) => {
  return (
    <>
      <div className="flex items-center justify-between w-full p-10 py-5">
        <h2 className="text-3xl font-bold tracking-tight text-main-500">
          Dashboard
        </h2>
      </div>
      <section className="flex-1 w-full">AcceptedSection</section>
    </>
  );
};

export default AcceptedSection;
