"use client";
import * as React from "react";

export type CalendarContextType = {
  monthIndex: number;
  calendarType: "Week" | "Month";
  setMonthIndex: (temp: number) => void;
  setCalendarType: (temp: "Week" | "Month") => void;

  dateSpecific: Date;
  setDateSpecific: (temp: Date) => void;
};

export const CalendarContext = React.createContext<CalendarContextType>({
  monthIndex: 0,
  calendarType: "Month",
  setMonthIndex: (index: number) => {},
  setCalendarType: (temp: "Week" | "Month") => {},

  dateSpecific: new Date(),
  setDateSpecific: (temp: Date) => {},
});

export const useCalendarContext = () => React.useContext(CalendarContext);

const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const today = new Date();
  const [monthIndex, setMonthIndex] = React.useState<number>(today.getMonth());
  const [dateSpecific, setDateSpecific] = React.useState<Date>(today);
  const [calendarType, setCalendarType] = React.useState<"Week" | "Month">(
    "Month"
  );
  return (
    <CalendarContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        calendarType,
        setCalendarType,
        dateSpecific,
        setDateSpecific,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
