import { ClassesType } from "./class.interface";
import { CustomerType } from "./customer.interface";
import { DurationType } from "./duration.interface";
import { StudentType } from "./student.interface";

export interface TransactionType {
  _id?: string;
  class?: ClassesType;
  price: number;
  duration: DurationType;
  customer?: CustomerType;
  status: TransactionStatusType;
  paidDate?: Date;
  expiryDate?: Date;
}
export interface TransactionsType {
  _id?: string;
  class?: ClassesType;
  price: number;
  duration: DurationType;
  student: StudentType;
  status: TransactionStatusType;
  paidDate?: Date;
  expiryDate?: Date;
}

export type TransactionStatusType = "Paid" | "Not Paid" | "Declined";
