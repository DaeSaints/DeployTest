"use client";
import React, { useEffect, useState } from "react";

// UI
import { NextClassCard } from "./card/next-class";
import { ScrollArea } from "@/components/ui/scroll-area";

// BACKEND
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { Button } from "@/components/ui/button";
import { Plus, PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const CalendarSideBar = ({
  userInfo,
  ATTENDANCES,
}: {
  userInfo: UserType | ParentType;
  ATTENDANCES: AttendanceType[];
}) => {
  const [schedule, setSchedule] = useState<AttendanceType[]>(ATTENDANCES);

  useEffect(() => {
    setSchedule(ATTENDANCES);
  }, [ATTENDANCES]);

  function getOrdinalSuffix(num: number) {
    if (num >= 11 && num <= 13) {
      return "th";
    }
    switch (num % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return (
    <article className="flex flex-col items-start justify-start w-full max-w-xs gap-4 bg-white">
      <Button className="py-4 rounded-full">
        <Plus className="w-5 h-5 mr-2" /> Class Schedule
      </Button>
      <ScrollArea className="w-full h-[calc(100vh-7rem)] pb-4 bg-white">
        <main className="flex flex-col items-start justify-start gap-2 px-2">
          {schedule?.map((attendance: AttendanceType, index) => {
            return (
              <NextClassCard
                key={attendance._id}
                attendance={attendance}
                index={index}
              />
            );
          })}
          {Array(5 - schedule.length)
            .fill([])
            .map((_, index) => {
              return (
                <Card
                  className="flex items-center justify-center w-full h-20 max-w-xs"
                  key={index}
                >
                  <div className="flex">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Add {schedule.length + 1}
                    {getOrdinalSuffix(schedule.length + 1)} Week Class
                  </div>
                </Card>
              );
            })}
        </main>
      </ScrollArea>
    </article>
  );
};

export default CalendarSideBar;
