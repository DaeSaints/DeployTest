import { StudentType } from "./student.interface";
import { TransactionType } from "./transaction.interface";

export interface ParentType {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  children?: StudentType[];
  transactions?: TransactionType[];
}
