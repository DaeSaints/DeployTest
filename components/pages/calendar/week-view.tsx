"use client";
import React from "react";

// DAYS
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek";

// UI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TIMESLOTS } from "@/utils/constants";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";

const WeeklyView = ({
  attendance,
  userInfo,
}: {
  attendance: AttendanceType[];
  userInfo: UserType | ParentType;
}) => {
  dayjs.extend(weekOfYear);
  dayjs.extend(isoWeek);

  const week = dayjs().week();
  const year = dayjs().year();

  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = dayjs()
      .year(year)
      .isoWeek(week - 1)
      .day(i);
    days.push(day);
  }

  return (
    <div className="relative w-full h-full bg-white">
      <div className="relative flex flex-col w-full -mt-4">
        <div className="sticky top-0 w-full h-20 bg-white">
          <div className="flex w-full py-2">
            <div className="flex items-center justify-center w-20" />
            <ul className="grid w-full grid-cols-7 grid-rows-1">
              {days.map((d) => {
                const selectedClassName =
                  d.format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") &&
                  "bg-main-500 text-white";

                return (
                  <li className="flex flex-col items-center justify-center h-18">
                    <p className="">{d.format("dd")}</p>
                    <div
                      className={`w-9 h-9 p-2 flex justify-center items-center rounded-full text-lg ${selectedClassName}`}
                    >
                      <span className="">{d.format("DD")}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <ul className="flex flex-col w-full h-full">
          {TIMESLOTS.map((timeslot, i) => {
            return (
              <li className="flex w-full min-h-[4rem] border-t" key={i}>
                <p className="flex flex-col w-20 min-h-[4rem] p-2 border-r text-sm">
                  {timeslot}
                </p>
                <div className="grid w-full min-h-[4rem] grid-cols-7 grid-rows-1">
                  {Array(7)
                    .fill([])
                    .map((_, index) => {
                      return <div className="p-2 border-r" key={index}></div>;
                    })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default WeeklyView;
