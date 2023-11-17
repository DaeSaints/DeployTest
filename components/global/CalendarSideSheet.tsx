"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { convertToTimeZone } from "@/utils/helpers/timeZone";
import { XCircle } from "lucide-react";
import React from "react";

export function CalendarSheet({
  trigger,
  setTrigger,
  selectedAttendance,
}: {
  trigger: boolean;
  setTrigger: (col: boolean) => void;
  selectedAttendance: AttendanceType;
}) {
  let startDateTime: Date = new Date(selectedAttendance.date);
  let endDateTime: Date = new Date(selectedAttendance.date);
  let [hours, minutes]: string[] = [];
  [hours, minutes] = selectedAttendance.startTime.split(":");
  startDateTime.setHours(Number(hours), Number(minutes));
  [hours, minutes] = selectedAttendance.endTime.split(":");
  endDateTime.setHours(Number(hours), Number(minutes));
  return (
    <Sheet open={trigger} onOpenChange={setTrigger}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Class Details</SheetTitle>
          <SheetDescription>
            Details for {selectedAttendance?.class.class} class at{" "}
            {selectedAttendance?.date.toDateString()}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-left">Time Zones</span>
            {selectedAttendance && (
              <ul className="flex flex-col gap-2">
                {Array(3)
                  .fill(["ET", "IST", "JST"])
                  .map((tz, index) => {
                    return (
                      <li className="" key={index}>
                        {convertToTimeZone(startDateTime, tz[index])} -{" "}
                        {convertToTimeZone(endDateTime, tz[index])}{" "}
                        <span className="font-medium">{tz[index]}</span>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
          <div className="grid items-center grid-cols-6 gap-4">
            <span className="font-medium text-right">Participants</span>
            <span className="col-span-5" />

            {selectedAttendance &&
            selectedAttendance.class.participants &&
            selectedAttendance.class.participants.length > 0 ? (
              <>
                {selectedAttendance?.class.participants?.map(
                  (student, index) => {
                    return (
                      <React.Fragment key={index}>
                        <span className="flex items-center justify-end">
                          <Button
                            variant={"ghost"}
                            className="p-1 rounded-full w-7 h-7"
                          >
                            <XCircle className="w-full h-full" />
                          </Button>
                        </span>
                        <span className="col-span-5">{student.name}</span>
                      </React.Fragment>
                    );
                  }
                )}
              </>
            ) : (
              <span className="col-span-6 text-center">No Participants</span>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
