"use client";
import React from "react";

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
  const ForYou = useForYouClasses(selectedChild._id as string);

  if (ForYou.isLoading) return null;

  const CLASS_COURSES = ForYou.data as ClassesType[];

  return (
    <>
      <section className="flex flex-col flex-1">
        <NonAcceptedHeader />
        <NonAcceptedBody AllClassCourses={CLASS_COURSES} />
      </section>
    </>
  );
};

export default NotAcceptedComponent;
