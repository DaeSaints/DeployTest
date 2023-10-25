import { ClassesType } from "./class.interface";
import { ParentType } from "./parent.interface";

export interface StudentType {
  _id?: string;
  name: string;
  age: number;
  profileURL?: string;
  parent: ParentType;
  enrolledClass?: ClassesType;
  status: StudentStatus;
  classExpiryDate?: Date;
  createdDate?: Date;
}

export type StudentStatus = "Paid" | "Not Paid";
