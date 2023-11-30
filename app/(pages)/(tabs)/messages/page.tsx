import NewMessagesComponent from "@/components/pages/messages/new-messages-component";
import { UserType } from "@/lib/interfaces/user.interface";
import { authOptions } from "@/utils/authOptions";
import { isParent } from "@/utils/helpers/isParent";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  const user: UserType = session?.user as UserType;
  console.log(user);
  user.role = 'parent'
  // console.log(user.role)

  if (!user) return null;
  return (
    <>
      <Suspense
        fallback={
          <div>
            Loading Main Messages <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        }
      >
        <NewMessagesComponent />
      </Suspense>
    </>
  );
};

export default page;
