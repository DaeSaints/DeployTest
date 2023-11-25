"use client";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import { getWeeksAndDaysInMonth } from "@/utils/calendar";
import React from "react";
import MonthlyView from "./month-view";
import WeeklyView from "./week-view";
import useAttendance from "@/lib/hooks/useAttendance";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { Loader2 } from "lucide-react";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";

const CalendarComponent = () => {
  const { calendarType } = useCalendarContext();
  // const { data, isLoading } = useAttendance(currDate);
  const data: AttendanceType[] = [];
  const isLoading = false;

  const { selectedChild } = useSelectedChild();
  if (selectedChild?.status === "Enrolling")
    return (
      <div className="flex items-center justify-center flex-1">
        <p className="">Waiting for Payment</p>
      </div>
    );

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <>
          {calendarType === "Month" ? (
            <MonthlyView attendance={data as AttendanceType[]} />
          ) : (
            <WeeklyView />
          )}
        </>
      )}
    </>
  );
};

export default CalendarComponent;
