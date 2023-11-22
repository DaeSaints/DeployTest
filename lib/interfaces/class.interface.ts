import { CustomerType } from "./customer.interface";
import { StudentType } from "./student.interface";

export interface ClassesType {
  _id?: string;
  image?: string;
  class: string;
  subscriptionPlans?: SubscriptionPlansType[];
  ageGroup: AgeGroupType;
  classDate: Date;
  startTime: string;
  endTime: string;
  zoomLink?: string;
  repeatedDays?: string[];
  participants?: StudentType[];
}

export type SubscriptionPlansType = {
  plan: PlansType;
  price: number;
};
export type AgeGroupType = "N1" | "N2" | "K1" | "K2";
export type PlansType = "1 Month" | "2 Month" | "3 Month";
