"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTeacherAttendances } from "../actions/attendance.action";

const useAttendance = (currDate: Date) => {
  const { data, isLoading } = useQuery({
    queryKey: [
      `attendance:${currDate.getFullYear()}:${currDate.getMonth()}`,
      currDate.getMonth(),
    ],
    queryFn: async () => {
      const { attendances } = await fetchTeacherAttendances({
        year: currDate.getFullYear(),
        month: currDate.getMonth(),
      });
      return attendances;
    },
  });
  return { data, isLoading };
};

export default useAttendance;
