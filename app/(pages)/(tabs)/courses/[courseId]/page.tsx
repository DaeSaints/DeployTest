import SingleCourseComponent from "@/components/pages/courses/single-course-component";
import { PageProps } from "@/lib/interfaces/page.props";
import React from "react";

const page = ({ params, searchParams }: PageProps) => {
  const courseId = params.courseId;
  return (
    <section className="flex flex-col flex-1 w-full gap-8 px-6 pt-8 pb-4 bg-white">
      <SingleCourseComponent />
    </section>
  );
};

export default page;
