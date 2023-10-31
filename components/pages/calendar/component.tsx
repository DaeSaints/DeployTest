"use client";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import { getWeeksAndDaysInMonth } from "@/utils/calendar";
import React from "react";
import MonthlyView from "./month-view";
import WeeklyView from "./week-view";
import useAttendance from "@/lib/hooks/useAttendance";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";

const CalendarComponent = () => {
  const { monthIndex, calendarType, dateSpecific } = useCalendarContext();
  const currDate = dateSpecific;
  currDate.setDate(1);
  currDate.setMonth(monthIndex);
  const month = getWeeksAndDaysInMonth(monthIndex, currDate.getFullYear());
  const { data, isLoading } = useAttendance(currDate);
  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          {calendarType === "Month" ? (
            <MonthlyView month={month} attendance={data as AttendanceType[]} />
          ) : (
            <WeeklyView month={month} />
          )}
        </>
      )}
    </>
  );
};

export default CalendarComponent;
