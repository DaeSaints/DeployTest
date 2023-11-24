"use client";
import React, { useState } from "react";

// BACKEND
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import { ClassesType } from "@/lib/interfaces/class.interface";
import useForYouClasses from "../hook/useForYouClasses";
import NonAcceptedBody from "./body";
import NonAcceptedHeader from "./header";

const NotAcceptedComponent = ({
  userInfo,
  selectedChild,
}: {
  userInfo: ParentType;
  selectedChild: StudentType;
}) => {
  if (!userInfo?.children) return null;
  const [selected, setSelected] = useState<ClassesType[]>([]);

  const ForYou = useForYouClasses(selectedChild._id as string);

  if (ForYou.isLoading) return null;

  const CLASS_COURSES = ForYou.data as ClassesType[];

  function addSelected(sel: ClassesType) {
    setSelected((prev) => [...prev, sel]);
  }

  const moveUp = (index: number) => {
    const newSelected = [...selected];
    if (index > 0) {
      const temp = newSelected[index];
      newSelected[index] = newSelected[index - 1];
      newSelected[index - 1] = temp;
      setSelected(newSelected);
    }
  };

  const moveDown = (index: number) => {
    const newSelected = [...selected];
    if (index < newSelected.length - 1) {
      const temp = newSelected[index];
      newSelected[index] = newSelected[index + 1];
      newSelected[index + 1] = temp;
      setSelected(newSelected);
    }
  };

  const remove = (index: number) => {
    const newSelected = [...selected];
    if (index >= 0 && index < newSelected.length) {
      newSelected.splice(index, 1);
      setSelected(newSelected);
    }
  };

  const clear = () => {
    setSelected([]);
  };

  return (
    <>
      <section className="flex flex-col flex-1">
        <NonAcceptedHeader clear={clear} length={selected.length} />
        <NonAcceptedBody
          AllClassCourses={CLASS_COURSES}
          selectedCourse={selected}
          moveDown={moveDown}
          moveUp={moveUp}
          remove={remove}
          addSelected={addSelected}
        />
      </section>
    </>
  );
};

export default NotAcceptedComponent;
