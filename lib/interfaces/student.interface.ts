import { AgeGroupType, ClassesType } from "./class.interface";
import { ParentType } from "./parent.interface";

export interface StudentType {
  _id?: string;
  name: string;
  profileURL?: string;
  age: number;
  gradeLevel: AgeGroupType;
  parent: ParentType;
  classSchedule: ClassesType[];
  status: StudentStatus;
}

export type StudentStatus = "Paid" | "Not Paid" | "Enrolling";
