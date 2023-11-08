import CalendarSideBar from "@/components/pages/calendar/sidebar";
import CalendarTopBar from "@/components/pages/calendar/topbar";
import CalendarProvider from "@/components/providers/CalendarProvider";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-1 w-full h-full bg-slate-100">
      <CalendarProvider>
        <CalendarSideBar />
        <div className="flex flex-col flex-1 w-full">
          <CalendarTopBar />
          <article className="flex flex-1">{children}</article>
        </div>
      </CalendarProvider>
    </section>
  );
};

export default layout;
