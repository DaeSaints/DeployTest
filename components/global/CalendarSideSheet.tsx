"use client";
import React from "react";

// BACKEND
import {
  updateStudentNo,
  updateStudentYes,
} from "@/lib/actions/attendance.action";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import { convertToTimeZone } from "@/utils/helpers/timeZone";
import { useQueryClient } from "@tanstack/react-query";

// UI
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "../ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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

  const queryClient = useQueryClient();

  async function handleUpdateAttendance(
    sel: StudentType,
    type: "Present" | "Not Present"
  ) {
    if (type === "Present") {
      const res = await updateStudentYes({
        attendanceId: selectedAttendance._id as string,
        studentId: sel._id as string,
      });

      if (res) {
        queryClient.invalidateQueries({
          queryKey: [`attendances:${selectedAttendance._id}`],
        });
        const currDate = selectedAttendance.date;
        queryClient.invalidateQueries({
          queryKey: [
            `attendance:${currDate.getFullYear()}:${currDate.getMonth()}`,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [`attendance:selected-${selectedAttendance._id}`],
        });
        setTrigger(false);
        toast({
          title: "Successfully Updated Attendance",
          variant: "success",
        });
      }
    } else {
      const res = await updateStudentNo({
        attendanceId: selectedAttendance._id as string,
        studentId: sel._id as string,
      });

      if (res) {
        queryClient.invalidateQueries({
          queryKey: [`attendances:${selectedAttendance._id}`],
        });
        const currDate = selectedAttendance.date;
        queryClient.invalidateQueries({
          queryKey: [
            `attendance:${currDate.getFullYear()}:${currDate.getMonth()}`,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [`attendance:selected-${selectedAttendance._id}`],
        });
        setTrigger(false);
        toast({
          title: "Successfully Updated Attendance",
          variant: "success",
        });
      }
    }
  }
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
            selectedAttendance?.classParticipants &&
            selectedAttendance?.classParticipants?.length > 0 ? (
              <>
                {selectedAttendance?.classParticipants?.map((student) => {
                  const found = selectedAttendance.studentsPresent?.find(
                    (present) => {
                      const temp: any = present;
                      return temp === student._id;
                    }
                  );

                  if (!found) {
                    return (
                      <React.Fragment key={student._id}>
                        <span className="flex items-center justify-end">
                          <Button
                            variant={"ghost"}
                            className="p-1 rounded-full w-7 h-7"
                            onClick={() => {
                              handleUpdateAttendance(student, "Present");
                            }}
                          >
                            <XCircle className="w-full h-full text-red-600" />
                          </Button>
                        </span>
                        <span className="col-span-5">{student.name}</span>
                      </React.Fragment>
                    );
                  } else {
                    return (
                      <React.Fragment key={student._id}>
                        <span className="flex items-center justify-end">
                          <Button
                            variant={"ghost"}
                            className="p-1 rounded-full w-7 h-7"
                            onClick={() => {
                              handleUpdateAttendance(student, "Not Present");
                            }}
                          >
                            <CheckCircle className="w-full h-full text-green-600" />
                          </Button>
                        </span>
                        <span className="col-span-5">{student.name}</span>
                      </React.Fragment>
                    );
                  }
                })}
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
