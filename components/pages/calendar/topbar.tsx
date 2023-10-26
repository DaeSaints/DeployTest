"use client";
import React from "react";

// UI
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { getMonthName } from "@/utils/calendar";
import { useCalendarContext } from "@/components/providers/CalendarProvider";

const CalendarTopBar = () => {
  const { monthIndex, setMonthIndex, calendarType, setCalendarType } =
    useCalendarContext();
  const currDate = new Date();
  currDate.setMonth(monthIndex);

  function prevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function nextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  return (
    <div className="flex items-center justify-between w-full pr-4 bg-white h-28">
      <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-slate-200">
        <Button
          className={`w-24 py-2 h-fit ${
            calendarType === "Week"
              ? "bg-white text-black hover:bg-white border font-semibold"
              : "text-black bg-slate-200 hover:bg-slate-100"
          }`}
          onClick={() => setCalendarType("Week")}
        >
          Week
        </Button>
        <Button
          className={`w-24 py-2 h-fit ${
            calendarType === "Month"
              ? "bg-white text-black hover:bg-white border font-semibold"
              : "text-black bg-slate-200 hover:bg-slate-100"
          }`}
          onClick={() => setCalendarType("Month")}
        >
          Month
        </Button>
      </div>
      <div className="flex items-center justify-center gap-8 w-[27rem]">
        <Button
          onClick={() => {
            const today = new Date();
            setMonthIndex(today.getMonth());
          }}
          type="button"
          variant={"outline"}
          className="font-bold"
        >
          Today
        </Button>
        <span className="flex-1 text-2xl font-bold">
          {getMonthName(currDate)} {currDate.getFullYear()}
        </span>
        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            onClick={prevMonth}
            variant={"outline"}
            className="w-8 h-8 p-1"
          >
            <ChevronLeftIcon className="w-full h-full" />
          </Button>
          <Button
            type="button"
            onClick={nextMonth}
            variant={"outline"}
            className="w-8 h-8 p-1"
          >
            <ChevronRightIcon className="w-full h-full" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarTopBar;
