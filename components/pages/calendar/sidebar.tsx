import React from "react";

// UI
import CalendarSelections from "./selections";
import SmallCalendar from "./small-calendar";

const CalendarSideBar = () => {
  return (
    <article className="flex flex-col w-full max-w-xs bg-white">
      <header className="flex items-center justify-start w-full pl-8 text-3xl font-bold h-28">
        <span>Calendar</span>
      </header>
      <main className="flex flex-col items-center justify-start flex-1 gap-4 pb-4">
        <SmallCalendar />
        <div className="w-full px-4">
          <CalendarSelections />
        </div>
      </main>
    </article>
  );
};

export default CalendarSideBar;
