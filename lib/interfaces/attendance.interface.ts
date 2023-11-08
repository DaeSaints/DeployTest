import { ClassesType } from "./class.interface";
import { MaterialType } from "./material.interface";
import { StudentType } from "./student.interface";

export interface AttendanceType {
  _id?: string;
  class: ClassesType;
  date: Date;
  startTime: string;
  endTime: string;
  isClassCancelled: boolean;
  classAttendanceType: ClassAttendanceType;
  classAttendanceStatus: ClassAttendanceStatus;
  studentsPresent?: StudentType[];
  studentsNotPresent?: StudentType[];
  specialClassParticipants?: StudentType[];
  materials?: MaterialType[];
}

export type ClassAttendanceType = "regular" | "special";
export type ClassAttendanceStatus = "ongoing" | "pending" | "cancelled";
