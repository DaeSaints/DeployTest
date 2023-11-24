"use client";
import React, { useMemo, useState } from "react";

// UI
import { ScrollArea } from "@/components/ui/scroll-area";

// BACKEND
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import { SelectedScheduleCard } from "./card/selected-schedule";
import {
  CLASS_COURSES,
  ClassCourseType,
} from "@/utils/constants/data/classCourse";
import ClassOptionCard from "./card/class-option";
import { Button } from "@/components/ui/button";
import MiniCalendarCard from "./card/mini-calendar";
import dayjs from "dayjs";
import { daysOfWeek } from "@/utils/helpers/daysOfWeek";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Trash2 } from "lucide-react";

const NotAcceptedSection = ({
  userInfo,
  selectedChild,
}: {
  userInfo: ParentType;
  selectedChild: StudentType;
}) => {
  if (!userInfo?.children) return null;
  const [selected, setSelected] = useState<ClassCourseType[]>([]);

  function addSelected(sel: ClassCourseType) {
    setSelected((prev) => [...prev, sel]);
  }

  const moveUp = (index: number) => {
    const newSelected = [...selected];
    if (index > 0) {
      const temp = newSelected[index];
      newSelected[index] = newSelected[index - 1];
      newSelected[index - 1] = temp;
      setSelected(newSelected);
    }
  };

  const moveDown = (index: number) => {
    const newSelected = [...selected];
    if (index < newSelected.length - 1) {
      const temp = newSelected[index];
      newSelected[index] = newSelected[index + 1];
      newSelected[index + 1] = temp;
      setSelected(newSelected);
    }
  };

  const remove = (index: number) => {
    const newSelected = [...selected];
    if (index >= 0 && index < newSelected.length) {
      newSelected.splice(index, 1);
      setSelected(newSelected);
    }
  };
  const month = dayjs().month();
  const year = dayjs().year();
  const firstDayOFMonth = dayjs(new Date(year, month, 1)).day();
  const lastDayOfMonth = dayjs(new Date(year, month)).endOf("month").day();

  const filteredOptions = useMemo(
    () =>
      CLASS_COURSES.filter((d) => {
        if (selected.length === 0) {
          const selectedDay = daysOfWeek.indexOf(d.day);
          if (selectedDay >= firstDayOFMonth) return d;
        } else if (selected.length === 4) {
          const selectedDay = daysOfWeek.indexOf(d.day);
          if (lastDayOfMonth >= selectedDay) return d;
        } else {
          return d;
        }
      }),
    [selected.length]
  );

  const router = useRouter();

  return (
    <>
      <section className="flex flex-col flex-1">
        <header className="flex flex-col px-10 pb-4 space-y-8">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-medium tracking-tight">
                Welcome to Umonics!
              </h2>
              <p className="text-muted-foreground">
                Create your class schedule before enrolling. You can only choose
                1 class per week
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={"outline"}
                type="button"
                disabled={selected.length === 0}
                onClick={() => {
                  setSelected([]);
                }}
                className="py-6 text-base font-bold"
              >
                Clear Schedule <Trash2 className="ml-2" />
              </Button>
              <Button
                type="button"
                disabled={selected.length === 0}
                onClick={() => {
                  router.push("/dashboard/new-enrollment/subscription");
                }}
                className="py-6 text-base font-bold"
              >
                Continue Enrollment <ArrowUpRight className="ml-2" />
              </Button>
            </div>
          </div>
        </header>
        <div className="flex flex-1 gap-6 px-10 1">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-start w-full gap-2">
              <SelectedScheduleCard
                classCourses={selected}
                moveUp={moveUp}
                moveDown={moveDown}
                remove={remove}
              />
              <MiniCalendarCard selected={selected} />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="grid grid-flow-row grid-cols-3 gap-2">
              {filteredOptions?.length !== 0 && filteredOptions ? (
                <>
                  {filteredOptions.map((s) => {
                    return (
                      <ClassOptionCard
                        key={s._id}
                        d={s}
                        add={addSelected}
                        length={selected.length}
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
      </section>
    </>
  );
};

export default NotAcceptedSection;
