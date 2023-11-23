import { AgeGroupType } from "@/lib/interfaces/class.interface";
import React from "react";
import RelatedClasses from "./related-classes";
import SmallCalendar from "./small-calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowUpRightSquareIcon } from "lucide-react";

const NewEnrollmentSidebar = ({
  ageGroup,
  classId,
  repeatedDays,
}: {
  ageGroup: AgeGroupType;
  classId: string;
  repeatedDays: string[];
}) => {
  return (
    <ScrollArea className="w-full h-screen col-span-3">
      <div className="flex flex-col w-full gap-6 px-8 py-8">
        <Button className="py-8 text-2xl font-bold">
          Enroll Now <ArrowUpRightSquareIcon className="ml-2" />
        </Button>
        <SmallCalendar repeatedDays={repeatedDays} />
        <RelatedClasses ageGroup={ageGroup} classId={classId} />
      </div>
    </ScrollArea>
  );
};

export default NewEnrollmentSidebar;
