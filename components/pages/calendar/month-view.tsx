"use client";
import React, { useState } from "react";

// UI
import { CalendarSheet } from "@/components/global/CalendarSideSheet";

import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { getMatrixMonth } from "@/utils/calendar/helpers";
import dayjs from "dayjs";

// BACKEND
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import { convertTime } from "@/utils/helpers/convertTime";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleAttendanceById } from "@/lib/actions/attendance.action";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { isParent } from "@/utils/helpers/isParent";

const MonthlyView = ({
  attendance,
  userInfo,
}: {
  attendance: AttendanceType[];
  userInfo: UserType | ParentType;
}) => {
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
    N1: "bg-violet-200",
    N2: "bg-red-200",
    K1: "bg-green-200",
    K2: "bg-orange-200",
  };

  // useQUERY
  const singleAttendance = useQuery({
    queryKey: [
      `attendance:selected-${selectedAttendance?._id}`,
      selectedAttendance?._id,
    ],
    queryFn: async () => {
      const { attendances } = await fetchSingleAttendanceById({
        attendanceId: selectedAttendance?._id as string,
      });
      return attendances;
    },
    enabled: selectedAttendance !== null,
  });

  return (
    <>
      {singleAttendance.status === "success" &&
        sheetTrigger &&
        selectedAttendance && (
          <CalendarSheet
            isParent={isParent(userInfo)}
            trigger={sheetTrigger}
            setTrigger={closeSheet}
            selectedAttendance={singleAttendance.data}
          />
        )}
      <div className="flex flex-col flex-1 w-full h-full bg-white">
        <div className="grid grid-cols-7 grid-rows-1">
          {monthMatrix[0].map((day, i) => {
            return (
              <div
                key={i}
                className="flex items-start justify-center w-full pt-2 text-sm font-semibold text-center border-r"
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

                  const dayAttendances = attendance?.filter((d) => {
                    if (dayjs(d.date).format(format) === currDay) {
                      return d;
                    }
                  });

                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-start w-full h-full p-2 border-b border-r"
                    >
                      <button
                        className={`${dayClass} w-8 h-8 hover:bg-main-200 rounded-full transition-colors mb-1`}
                      >
                        <span className="text-base">{day.format("D")}</span>
                      </button>
                      {dayAttendances && dayAttendances.length > 0 ? (
                        <>
                          {dayAttendances.map((dayAttendance) => {
                            const colorClass =
                              AGEGROUP_COLORS[dayAttendance.ageGroup];
                            return (
                              <button
                                onClick={() => {
                                  setSheetTrigger(true);
                                  setSelectedAttendance(dayAttendance);
                                }}
                                className="flex flex-col items-start justify-start flex-1 w-full"
                              >
                                <div
                                  className={`w-full flex justify-between ${colorClass} my-1 p-1`}
                                >
                                  <div className="text-xs font-medium">
                                    {dayAttendance.class.class}
                                  </div>
                                  <p className="text-xs">
                                    {convertTime(
                                      dayAttendance.startTime,
                                      dayAttendance.endTime
                                    )}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </>
                      ) : null}
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
