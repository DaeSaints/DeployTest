import DashboardComponent from "@/components/pages/dashboard/component";
import { fetchSingleUserById } from "@/lib/actions/user.action";
import React from "react";

const page = async () => {
  const user = await fetchSingleUserById({ _id: "65176d6b9ce0272c671d6583" });
  return <DashboardComponent user={user} />;
};

export default page;
