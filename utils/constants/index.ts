import { AgeGroupType } from "@/libs/interfaces/class.interface";
import { UserType } from "@/libs/interfaces/user.interface";

export const UsersData: UserType[] = [
  {
    _id: "1",
    name: "Kielo Bash T. Mercado",
    email: "kielo.mercado@gmail.com",
    image: "",
    role: "general manager",
    createdDate: new Date(),
  },
  {
    _id: "2",
    name: "Thet Htoo Kyaw",
    email: "tony@gmail.com",
    image: "",
    role: "customer support",
    createdDate: new Date(),
  },
];

interface GroupType {
  label: string;
  value: AgeGroupType;
}
export const AgeGroups: GroupType[] = [
  { label: "N1 (2-3 yrs old)", value: "N1" },
  { label: "N2 (3-4 yrs old)", value: "N2" },
  { label: "K1 (4-5 yrs old)", value: "K1" },
  { label: "K2 (5-6 yrs old)", value: "K2" },
];

export const DaysOfTheWeekSunday = [
  {
    id: "Sunday",
    label: "Sunday",
  },
  {
    id: "Monday",
    label: "Monday",
  },
  {
    id: "Tuesday",
    label: "Tuesday",
  },
  {
    id: "Wednesday",
    label: "Wednesday",
  },
  {
    id: "Thursday",
    label: "Thursday",
  },
  {
    id: "Friday",
    label: "Friday",
  },
  {
    id: "Saturday",
    label: "Saturday",
  },
];
