import CoursesSelection from "@/components/pages/courses/courses-grid";
import CoursesManagerHeader from "@/components/pages/courses/header";
import React from "react";

const page = () => {
  return (
    <article className="flex flex-col flex-1 w-full h-full">
      <CoursesManagerHeader />
      <CoursesSelection />
    </article>
  );
};

export default page;
