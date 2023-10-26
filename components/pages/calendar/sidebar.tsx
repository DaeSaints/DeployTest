"use client";
import React from "react";

// UI
import { Calendar } from "@/components/ui/calendar";
import CalendarSelections from "./selections";

const CalendarSideBar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  console.log(date);

  return (
    <article className="flex flex-col w-full max-w-xs pt-4 bg-white">
      <header className="w-full h-24"></header>
      <main className="flex flex-col items-center justify-start flex-1 gap-4 pb-4">
        <div className="w-full px-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full border-b-2 border-b-slate-100"
          />
        </div>
        <div className="w-full px-4">
          <CalendarSelections />
        </div>
      </main>
    </article>
  );
};

export default CalendarSideBar;
