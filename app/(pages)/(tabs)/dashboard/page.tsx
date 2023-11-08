import { PageProps } from "@/lib/interfaces/page.props";
import { UserType } from "@/lib/interfaces/user.interface";
import { authOptions } from "@/utils/authOptions";
import { isParent } from "@/utils/helpers/isParent";
import { getServerSession } from "next-auth";
import React from "react";

const page = async ({ searchParams }: PageProps) => {
  const session = await getServerSession(authOptions);
  const user: UserType = session?.user as UserType;
  console.log(user.role)
  console.log(session?.user)
console.log(isParent(user));
  if (!user) return null;

  return <div>DashboardsPage</div>;
}
export default page;
