import ParentComponent from "@/components/pages/dashboard/parent-component";
import TeacherComponent from "@/components/pages/dashboard/teacher-component";
import { PageProps } from "@/lib/interfaces/page.props";
import { UserType } from "@/lib/interfaces/user.interface";
import { authOptions } from "@/utils/authOptions";
import { isParent } from "@/utils/helpers/isParent";
import { getServerSession } from "next-auth";
import React from "react";

const page = async ({ searchParams }: PageProps) => {
  const session = await getServerSession(authOptions);
  const user: UserType = session?.user as UserType;
  console.log(user._id);
  if (!user) return null;

  return (
    <>
      {isParent(user) ? (
        <>
          <ParentComponent userInfo={user} />
        </>
      ) : (
        <>
          <TeacherComponent userInfo={user} />
        </>
      )}
    </>
  );
};
export default page;
