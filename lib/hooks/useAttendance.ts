"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAttendanceTeachers } from "../actions/attendance.action";

const useAttendance = (currDate: Date) => {
  const { data, isLoading } = useQuery({
    queryKey: [`attendance`, currDate.getMonth()],
    queryFn: async () => {
      const { attendance } = await fetchAttendanceTeachers({ currDate });
      return attendance;
    },
  });
  return { data, isLoading };
};

export default useAttendance;
