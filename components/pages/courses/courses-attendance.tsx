"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle } from "lucide-react";
import React from "react";

const CoursesAttendance = () => {
  return (
    <div className="flex flex-col w-full max-w-xs p-4 text-white rounded-lg shadow-lg bg-main-700">
      <header className="flex gap-1 pt-2 pb-4 border-b">
        <span className="text-5xl font-semibold">28</span>
        <div className="flex flex-col">
          <span className="">Wed</span>
          <span className="">January</span>
        </div>
      </header>
      <article className="flex-1 w-full mt-4 overflow-hidden">
        <ScrollArea className="w-full h-[20rem] p-2">
          <ul className="flex flex-col w-full h-full gap-2">
            <li className="flex items-center justify-start gap-2">
              <Button variant={"ghost"} className="p-1 rounded-full w-7 h-7">
                <CheckCircle className="w-full h-full" />
              </Button>
              <span className="">Kielo Mercado - 2yrs.</span>
            </li>
          </ul>
        </ScrollArea>
      </article>
    </div>
  );
};

export default CoursesAttendance;
