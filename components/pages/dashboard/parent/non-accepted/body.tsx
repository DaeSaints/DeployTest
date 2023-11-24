"use client";
import React, { useMemo } from "react";
import { ClassesType } from "@/lib/interfaces/class.interface";
import { daysOfWeek } from "@/utils/helpers/daysOfWeek";
import dayjs from "dayjs";

// UI
import { SelectedScheduleCard } from "../card/selected-schedule";
import MiniCalendarCard from "../card/mini-calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClassOptionCard from "../card/class-option";

const NonAcceptedBody = ({
  AllClassCourses,
  selectedCourse,
  moveUp,
  moveDown,
  remove,
  addSelected,
}: {
  AllClassCourses: ClassesType[];
  selectedCourse: ClassesType[];
  moveUp: (sel: number) => void;
  moveDown: (sel: number) => void;
  remove: (sel: number) => void;
  addSelected: (sel: ClassesType) => void;
}) => {
  const month = dayjs().month();
  const year = dayjs().year();
  const firstDayOFMonth = dayjs(new Date(year, month, 1)).day();
  const lastDayOfMonth = dayjs(new Date(year, month)).endOf("month").day();

  const filteredOptions = useMemo(
    () =>
      AllClassCourses.filter((d) => {
        if (selectedCourse.length === 0) {
          const selectedDay = daysOfWeek.indexOf(d.day);
          if (selectedDay >= firstDayOFMonth) return d;
        } else if (selectedCourse.length === 4) {
          const selectedDay = daysOfWeek.indexOf(d.day);
          if (lastDayOfMonth >= selectedDay) return d;
        } else {
          return d;
        }
      }),
    [selectedCourse.length]
  );

  return (
    <div className="flex flex-1 gap-6 px-10 1">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-start w-full gap-2">
          <SelectedScheduleCard
            classCourses={selectedCourse}
            moveUp={moveUp}
            moveDown={moveDown}
            remove={remove}
          />
          <MiniCalendarCard selected={selectedCourse} />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="grid grid-flow-row grid-cols-3 gap-2">
          {filteredOptions?.length !== 0 && filteredOptions ? (
            <>
              {filteredOptions?.map((s) => {
                return (
                  <ClassOptionCard
                    key={s._id}
                    d={s}
                    add={addSelected}
                    length={selectedCourse.length}
                  />
                );
              })}
            </>
          ) : (
            <div>No Classes Available</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NonAcceptedBody;
