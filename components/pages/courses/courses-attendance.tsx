"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, Circle } from "lucide-react";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import React, { useEffect, useState } from "react";
import {
  fetchParticipants,
  updateStudentNo,
  updateStudentYes,
} from "@/lib/actions/attendance.action";
import { StudentType } from "@/lib/interfaces/student.interface";
import { refreshPage } from "@/utils/helpers/refreshPage";

const CoursesAttendance = ({ attendance }: { attendance: AttendanceType }) => {
  const [participants, setParticipants] = useState<StudentType[]>([]);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const courseDate = new Date(attendance.date);
  const isPastCourse = currentDate > courseDate;

  useEffect(() => {
    // Fetch participants when the component mounts
    fetchParticipants(attendance.class.participants || [])
      .then((data) => {
        setParticipants(data);
      })
      .catch((error) => {
        console.error("Error fetching participants:", error);
      });
  }, [attendance]);



  async function handleYes(student: StudentType) {
if (isPastCourse) {
    alert("Editing past courses is not allowed.");
    return;
  }

  const res = await updateStudentYes({
    studentId: student._id as string,
    attendanceId: attendance?._id as string,
  });

  if (res.message) {
    alert(res.message);
    refreshPage();
  }
}

  async function handleNo(student: StudentType) {
    if (isPastCourse) {
      alert("Editing past courses is not allowed.");
      return;
    }
  
    const res = await updateStudentNo({
      studentId: student._id as string,
      attendanceId: attendance?._id as string,
    });
  
    if (res.message) {
      alert(res.message);
      refreshPage();
    }
  }
  return (
    <div className="flex flex-col w-full max-w-xs p-4 text-white rounded-lg shadow-lg bg-main-700">
      <header className="flex items-center justify-start gap-1 pt-2 pb-4 border-b">
        <span className="text-5xl font-semibold">
          {new Date(attendance.date).getDate()}
        </span>
        <div className="flex flex-col">
          <span className="font-medium">
            {new Date(attendance.date).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </span>
          <span className="font-medium">
            {new Date(attendance.date).toLocaleDateString("en-US", {
              month: "long",
            })}
          </span>
        </div>
      </header>
      <article className="flex-1 w-full mt-4 overflow-hidden">
        <ScrollArea className="w-full h-[20rem] p-2">
          <ul className="flex flex-col w-full h-full gap-2">
            {attendance.classAttendanceType === "regular" ? (
              participants.map((student) => {
                const included = attendance.studentsPresent?.some(
                  (d) => d._id === student._id
                );
                return (
                  <div
                    className="flex items-center justify-between w-full gap-1"
                    key={student._id}
                  >
                    {included ? (
                      <Button
                        variant={"ghost"}
                        className="p-1 rounded-full w-7 h-7"
                        onClick={() => handleNo(student)}
                      >
                        <CheckCircle className="w-full h-full" />
                      </Button>
                    ) : (
                      <Button
                        variant={"ghost"}
                        className="p-1 rounded-full"
                        onClick={() => handleYes(student)}
                      >
                        <Circle className="w-5 h-5 text-gray-500" />
                      </Button>
                    )}
                    <span className="ml-2">
                      {student.name} - {student.age}years old
                    </span>
                  </div>
                );
              })
            ) : (
              <li>No students were present for this special class.</li>
            )}
          </ul>
        </ScrollArea>
      </article>
    </div>
  );
};

export default CoursesAttendance;
