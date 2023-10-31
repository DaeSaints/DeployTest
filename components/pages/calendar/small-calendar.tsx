"use client";
import React from "react";

// UI
import { Calendar } from "@/components/ui/calendar";

const SmallCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="w-full px-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-full border-b-2 border-b-slate-100"
      />
    </div>
  );
};

export default SmallCalendar;
