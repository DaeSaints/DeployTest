"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const CoursesSelection = () => {
  return (
    <ScrollArea className="w-full h-[32rem]">
      <div className="grid flex-1 w-full grid-flow-row grid-cols-4 gap-4 p-4 bg-slate-200">
        {Array(10)
          .fill([])
          .map((_, index) => {
            return (
              <Link
                href={`/courses/${"123"}`}
                key={index}
                className="w-full h-[14rem] bg-white rounded-lg shadow-md flex flex-col relative overflow-hidden cursor-pointer group hover:opacity-70 transition"
              >
                <div className="flex-[8] w-full bg-main-300 py-3 px-4">
                  <span className="text-lg font-semibold text-white drop-shadow-md">
                    Elephant Class
                  </span>
                </div>
                <div className="w-full flex-[5] flex gap-8 px-4 py-3">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xl font-semibold">4</span>
                      <User className="w-6 h-6 text-main-600" />
                    </div>
                    <p className="text-xs">Students</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xl font-semibold">10</span>
                      <Book className="w-6 h-6 text-main-600" />
                    </div>
                    <p className="text-xs">Materials</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </ScrollArea>
  );
};

export default CoursesSelection;
