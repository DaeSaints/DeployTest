import { AgeGroupType } from "@/lib/interfaces/class.interface";
import React from "react";
import RelatedClasses from "./related-classes";

const NewEnrollmentSidebar = ({
  ageGroup,
  classId,
}: {
  ageGroup: AgeGroupType;
  classId: string;
}) => {
  return (
    <div className="flex flex-col col-span-3 px-4 py-10">
      <RelatedClasses ageGroup={ageGroup} classId={classId} />
    </div>
  );
};

export default NewEnrollmentSidebar;
