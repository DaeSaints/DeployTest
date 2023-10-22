"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CourseDisplay from "./single-courses-display";

const SingleCourseComponent = () => {
  const TABS = ["Upcoming", "Past", "Pending", "Cancelled"] as const;
  const [selectedTab, setSelectedTab] = useState("Upcoming");
  return (
    <>
      <div className="flex items-center justify-between w-full gap-2">
        <div className="text-left text-main-700">
          <span className="text-2xl font-semibold">Elephant Class</span>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias illo
            esse perspiciatis.
          </p>
        </div>
        <div className="flex p-2 rounded-lg w-fit bg-slate-100">
          {TABS.map((tab) => {
            const activeClass =
              selectedTab === tab
                ? "bg-white shadow text-black font-semibold rounded-lg"
                : "";
            return (
              <Button
                key={tab}
                type="button"
                onClick={() => setSelectedTab(tab)}
                variant={"ghost"}
                className={`text-slate-500 hover:bg-white ${activeClass}`}
              >
                {tab}
              </Button>
            );
          })}
        </div>
      </div>
      <CourseDisplay />
    </>
  );
};

export default SingleCourseComponent;
