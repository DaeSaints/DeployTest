import { PageProps } from "@/lib/interfaces/page.props";
import React from "react";

const NewEnrollmentPage = ({ params, searchParams }: PageProps) => {
  const { _id } = params;
  console.log(_id);
  return <div>NewEnrollmentPage</div>;
};

export default NewEnrollmentPage;
