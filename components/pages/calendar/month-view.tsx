"use client";

import React, { useState } from "react";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { CalendarSheet } from "@/components/global/CalendarSideSheet";
import { getMatrixMonth } from "@/utils/calendar/helpers";
import dayjs from "dayjs";
import { useCalendarContext } from "@/components/providers/CalendarProvider";

const MonthlyView = ({ attendance }: { attendance: AttendanceType[] }) => {
  const [sheetTrigger, setSheetTrigger] = useState(false);
  const [selectedAttendance, setSelectedAttendance] =
    useState<AttendanceType | null>(null);

  const format = "DD-MM-YY";
  const today = dayjs().format(format);

  const { monthIndex } = useCalendarContext();
  const monthMatrix = getMatrixMonth(monthIndex);

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
      <div className="flex flex-col flex-1 bg-white">
        <div className="grid grid-cols-7 grid-rows-1">
          {monthMatrix[0].map((day, i) => {
            return (
              <div
                key={i}
                className="flex items-start justify-center w-full pt-2 text-xl font-semibold text-center border-r"
              >
                <div className="">
                  {day.format("dd").charAt(0)}
                  {day.format("dd").charAt(1)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid flex-1 grid-cols-7 grid-rows-5">
          {monthMatrix.map((row, i) => {
            return (
              <React.Fragment key={i}>
                {row.map((day, idx) => {
                  const currDay = day.format(format);
                  const dayClass =
                    today === currDay && "bg-main-500 text-white";

                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center w-full h-full p-2 border-b border-r"
                    >
                      <button
                        className={`${dayClass} w-8 h-8 hover:bg-main-200 rounded-full transition-colors`}
                      >
                        <span className="text-base">{day.format("D")}</span>
                      </button>
                      <div className="flex flex-wrap items-center flex-1 w-full justify-evenly">
                        {/* {repeatedDaysIndex.includes(day.day()) && (
                          <>
                            <div className="w-[6px] h-[6px] rounded-full bg-main-500"></div>
                          </>
                        )} */}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MonthlyView;
