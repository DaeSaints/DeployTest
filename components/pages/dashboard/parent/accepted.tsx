import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import React from "react";

const AcceptedSection = ({
  userInfo,
  selectedChild,
}: {
  userInfo: ParentType;
  selectedChild: StudentType;
}) => {
  return (
    <>
      <section className="flex-1 w-full">AcceptedSection</section>
    </>
  );
};

export default AcceptedSection;
