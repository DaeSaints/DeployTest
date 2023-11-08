"use client";

import React, { useState } from "react";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { getDayOfWeek } from "@/utils/calendar";
import { CalendarSheet } from "@/components/global/CalendarSideSheet";

const MonthlyView = ({
  month,
  attendance,
}: {
  month: Date[][];
  attendance: AttendanceType[];
}) => {
  const [sheetTrigger, setSheetTrigger] = useState(false);
  const [selectedAttendance, setSelectedAttendance] =
    useState<AttendanceType | null>(null);

  function closeSheet(col: boolean) {
    setSheetTrigger(false);
    setSelectedAttendance(null);
  }

  const AGEGROUP_COLORS = {
    N1: "bg-violet-300",
    N2: "bg-red-300",
    K1: "bg-green-300",
    K2: "bg-orange-300",
  };
  return (
    <>
      {sheetTrigger && selectedAttendance && (
        <CalendarSheet
          trigger={sheetTrigger}
          setTrigger={closeSheet}
          selectedAttendance={selectedAttendance}
        />
      )}
      <div
        className={`grid flex-1 h-full grid-cols-7 ${
          month.length === 5 ? "grid-rows-5" : "grid-rows-6"
        } bg-white rounded-lg shadow-md`}
      >
        {month.map((week, index) => {
          return (
            <React.Fragment key={index}>
              {week.map((day, idx) => {
                const dayOfTheWeek = getDayOfWeek(day);
                const today = new Date();
                const temp = attendance.filter((d) => {
                  return d.date.toDateString() === day.toDateString();
                });
                const dateTodayClass =
                  day.toDateString() === today.toDateString()
                    ? "bg-main-100 w-7 h-7 flex justify-center items-center rounded-full font-semibold"
                    : "font-normal";

                if (index === 0)
                  return (
                    <div
                      className="flex flex-col items-center justify-start w-full h-full gap-1 p-2 border"
                      key={idx}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-sm font-semibold">
                          {dayOfTheWeek}
                        </span>
                        <span className={`${dateTodayClass} text-xs`}>
                          {day.getDate()}
                        </span>
                        <div className="flex flex-col w-full">
                          {temp?.map((single) => {
                            const colorClass =
                              AGEGROUP_COLORS[single.class.ageGroup];
                            return (
                              <button
                                className={`${colorClass} text-xs px-2 py-1 rounded-full text-left`}
                                key={single._id}
                                onClick={() => {
                                  setSelectedAttendance(single);
                                  setSheetTrigger((prev) => !prev);
                                }}
                              >
                                {single.class.class}{" "}
                                <span className="font-medium">
                                  {single.startTime} - {single.endTime}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );

                return (
                  <div
                    className="flex flex-col items-center justify-start w-full h-full gap-1 p-2 border"
                    key={idx}
                  >
                    <span className={`${dateTodayClass} text-xs`}>
                      {day.getDate()}
                    </span>
                    <div className="flex flex-col w-full">
                      {temp?.map((single) => {
                        const colorClass =
                          AGEGROUP_COLORS[single.class.ageGroup];
                        return (
                          <button
                            onClick={() => {
                              setSelectedAttendance(single);
                              setSheetTrigger((prev) => !prev);
                            }}
                            className={`${colorClass} text-xs px-2 py-1 rounded-full text-left`}
                            key={single._id}
                          >
                            {single.class.class}{" "}
                            <span className="font-medium">
                              {single.startTime} - {single.endTime}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default MonthlyView;
