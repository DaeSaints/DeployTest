"use client";
import React from "react";

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
import { getDayOfWeek } from "@/utils/calendar";

const WeeklyView = () => {
  return (
    <div className="flex flex-col flex-1 h-[35.2rem]">
      <Table className="relative bg-white">
        <TableHeader className="sticky top-0 z-10 w-full">
          <TableRow className="h-[4.5rem] w-full bg-white">
            <TableHead className="w-[3rem]"></TableHead>
            {/* {month.map((week, id) => {
              const today = new Date();
              const isTodayInArray = week.some((date) => {
                return date.toDateString() === today.toDateString();
              });
              if (isTodayInArray)
                return (
                  <React.Fragment key={id}>
                    {Array(7)
                      .fill([])
                      .map((_, idx1) => {
                        if (idx1 < week.length) {
                          const day = week[idx1];
                          const dayOfTheWeek = getDayOfWeek(day);
                          const today = new Date();
                          const dateTodayClass =
                            day.toDateString() === today.toDateString()
                              ? "bg-main-100 w-7 h-7 flex justify-center items-center rounded-full font-semibold"
                              : "font-normal";
                          return (
                            <TableHead className="w-32 text-center" key={idx1}>
                              <div className="flex flex-col items-center justify-center">
                                <span className="text-xs font-semibold">
                                  {dayOfTheWeek}
                                </span>
                                <span className={`${dateTodayClass} text-base`}>
                                  {day.getDate()}
                                </span>
                              </div>
                            </TableHead>
                          );
                        } else {
                          return (
                            <TableHead
                              className="w-32 text-center"
                              key={idx1}
                            ></TableHead>
                          );
                        }
                      })}
                  </React.Fragment>
                );
            })} */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {TIMESLOTS.map((timeslot, idx1) => {
            return (
              <TableRow key={idx1} className="h-[10rem]">
                <TableCell className="font-medium">{timeslot}</TableCell>
                {Array(7)
                  .fill([])
                  .map((day, idx2) => {
                    return (
                      <TableCell
                        className="w-32 font-medium border-x"
                        key={idx2}
                      ></TableCell>
                    );
                  })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default WeeklyView;
