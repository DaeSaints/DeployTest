"use client";
import React, { useState } from "react";

// UI
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const CoursesManagerHeader = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  // TEMPS
  const COURSE_LEVEL = ["N1", "N2", "K1", "K2"];
  return (
    <div className="flex items-center justify-start w-full gap-2 px-4 py-5 bg-white border-b border-b-slate-300 drop-shadow-md">
      <div className="relative flex w-full max-w-sm pl-6 border rounded-md">
        <Search className="absolute bottom-0 w-5 h-5 -translate-y-1/2 left-2" />
        <Input
          placeholder="Search..."
          variant={"transparent"}
          className="border-none outline-none"
        />
      </div>
      <Select onValueChange={(e) => setSelectedLevel(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Course Level" />
        </SelectTrigger>
        <SelectContent>
          {COURSE_LEVEL.map((level) => {
            return (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CoursesManagerHeader;
