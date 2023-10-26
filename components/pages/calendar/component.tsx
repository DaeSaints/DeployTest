"use client";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getDayOfWeek, getWeeksAndDaysInMonth } from "@/utils/calendar";
import React from "react";

const CalendarComponent = () => {
  const { monthIndex, calendarType } = useCalendarContext();
  const currDate = new Date();
  currDate.setMonth(monthIndex);
  const month = getWeeksAndDaysInMonth(
    currDate.getMonth(),
    currDate.getFullYear()
  );
  return (
    <>
      {calendarType === "Month" ? (
        <>
          <div
            className={`grid flex-1 h-full grid-cols-7 ${
              month.length === 5 ? "grid-rows-5" : "grid-rows-6"
            } bg-white rounded-lg shadow-md`}
          >
            {month.map((week, index) => {
              return (
                <>
                  {week.map((day, idx) => {
                    const dayOfTheWeek = getDayOfWeek(day);
                    const today = new Date();
                    const dateTodayClass =
                      day.toDateString() === today.toDateString()
                        ? "bg-main-100 w-7 h-7 flex justify-center items-center rounded-full font-semibold"
                        : "font-normal";
                    if (index === 0)
                      return (
                        <div
                          className="flex items-start justify-center w-full h-full p-2 border"
                          key={idx}
                        >
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-sm font-semibold">
                              {dayOfTheWeek}
                            </span>
                            <span className={`${dateTodayClass} text-xs`}>
                              {day.getDate()}
                            </span>
                          </div>
                        </div>
                      );

                    return (
                      <div
                        className="flex items-start justify-center w-full h-full p-2 border"
                        key={idx}
                      >
                        <span className={`${dateTodayClass} text-xs`}>
                          {day.getDate()}
                        </span>
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col flex-1 overflow-hidden">
          <ScrollArea className="flex-grow overflow-auto">
            <div
              className={`grid grid-cols-7 grid-rows-12 h-full w-full bg-white rounded-lg shadow-md `}
            >
              {Array(12)
                .fill([])
                .map((_, index) => {
                  return (
                    <>
                      {Array(7)
                        .fill([])
                        .map((_, idx) => {
                          return (
                            <div className="w-full h-[10rem] border ">asd</div>
                          );
                        })}
                    </>
                  );
                })}
            </div>
          </ScrollArea>
        </div>
      )}
    </>
  );
};

export default CalendarComponent;
