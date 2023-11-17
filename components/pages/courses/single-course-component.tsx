"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CourseDisplay from "./single-courses-display";
import { Undo } from "lucide-react";
import TooltipButton from "@/components/global/TooltipButton";

import Link from "next/link";

const SingleCourseComponent = () => {
  const TABS = ["Today", "Upcoming", "Past", "Pending", "Cancelled"] as const;
  const [selectedTab, setSelectedTab] = useState("Today");

  const [page, setPage] = useState(1); // Initialize page to 1

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setSelectedTab(tab);
    setPage(1); // Reset the page to 1 when changing tabs
  };
  return (
    <>
      <div className="flex items-center justify-between w-full gap-2">
        <div className="text-left text-main-700">
          <div className="flex items-center justify-start gap-2 text-2xl font-semibold">
            <span className="">Elephant Class</span>
            <TooltipButton tooltip="Go Back">
              <Link href={"/courses"}>
                <Button
                  type="button"
                  variant={"ghost"}
                  className="w-8 h-8 p-1 rounded-full"
                >
                  <Undo className="w-full h-full" />
                </Button>
              </Link>
            </TooltipButton>
          </div>
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
                onClick={() => handleTabChange(tab)}
                variant={"ghost"}
                className={`text-slate-500 hover:bg-white ${activeClass}`}
              >
                {tab}
              </Button>
            );
          })}
        </div>
      </div>
      <CourseDisplay selectedTab={selectedTab.toLowerCase()} page={page} setPage={setPage}/>
    </>
  );
};

export default SingleCourseComponent;
