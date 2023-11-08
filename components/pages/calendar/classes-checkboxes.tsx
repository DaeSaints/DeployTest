"use client";
import React from "react";

// UI
import { Checkbox } from "@/components/ui/checkbox";

const classes = [
  {
    id: "elephant",
    label: "Elephant Class",
  },
  {
    id: "tiger",
    label: "Tiger Class",
  },
] as const;

const ClassesCheckboxes = () => {
  return (
    <ul className="flex flex-col w-full gap-2">
      {classes.map((item, index) => {
        return (
          <li className="flex w-full gap-2" key={index}>
            <Checkbox onCheckedChange={(checked) => {}} />
            <span className="">{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default ClassesCheckboxes;
