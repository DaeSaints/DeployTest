"use client";
import * as React from "react";

export type CalendarContextType = {
  monthIndex: number;
  calendarType: "Week" | "Month";
  setMonthIndex: (temp: number) => void;
  setCalendarType: (temp: "Week" | "Month") => void;
};

export const CalendarContext = React.createContext<CalendarContextType>({
  monthIndex: 0,
  calendarType: "Month",
  setMonthIndex: (index: number) => {},
  setCalendarType: (temp: "Week" | "Month") => {},
});

export const useCalendarContext = () => React.useContext(CalendarContext);

const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const today = new Date();
  const [monthIndex, setMonthIndex] = React.useState<number>(today.getMonth());
  const [calendarType, setCalendarType] = React.useState<"Week" | "Month">(
    "Month"
  );
  return (
    <CalendarContext.Provider
      value={{ monthIndex, setMonthIndex, calendarType, setCalendarType }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
