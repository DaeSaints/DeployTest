"use client";
import React from "react";

// UI
import { Checkbox } from "@/components/ui/checkbox";

const children = [
  {
    id: "123",
    label: "Stand",
  },
  {
    id: "1234",
    label: "Juan",
  },
] as const;

const ChildrenCheckboxes = () => {
  return (
    <ul className="flex flex-col w-full gap-2">
      {children.map((item, index) => {
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

export default ChildrenCheckboxes;
