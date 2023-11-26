"use client";

import { fetchStudentAttendances } from "@/lib/actions/attendance.action";
import { useQuery } from "@tanstack/react-query";

type UseAttendancesProps =
  | { isParent: true; studentId: string; currDate?: never }
  | { isParent?: false; studentId?: never; currDate: Date };

const useAttendancesAll = ({ studentId, currDate }: UseAttendancesProps) => {
  console.log({ studentId, currDate });
};

export default useAttendancesAll;
