"use client";
import React, { useState } from "react";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";

// UI
import AcceptedSection from "./accepted";
import NotAcceptedSection from "./not-accepted";
import ChildSwitcher from "./child-switcher";

const ParentMain = ({ parent }: { parent: ParentType }) => {
  if (parent?.children?.length === 0 && parent?.children) return null;

  const [selectedChild, setSelectedChild] = useState<StudentType>(
    (parent?.children as StudentType[])[0] as StudentType
  );
  function handleSelectChild(sel: StudentType) {
    setSelectedChild(sel);
  }
  return (
    <section className="flex flex-col w-full h-screen overflow-y-auto bg-white">
      <div className="flex items-center justify-between w-full p-10 py-5">
        <h2 className="text-3xl font-bold tracking-tight text-main-500">
          Dashboard
        </h2>
        <ChildSwitcher
          parent={parent}
          students={parent?.children as StudentType[]}
          selectedChild={selectedChild}
          handleSelectChild={handleSelectChild}
        />
      </div>
      {selectedChild?.enrolledClass ? (
        <>
          <AcceptedSection userInfo={parent} selectedChild={selectedChild} />
        </>
      ) : (
        <>
          <NotAcceptedSection userInfo={parent} selectedChild={selectedChild} />
        </>
      )}
    </section>
  );
};

export default ParentMain;
