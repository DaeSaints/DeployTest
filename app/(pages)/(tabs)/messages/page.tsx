import NewMessagesComponent from "@/components/pages/messages/new-messages-component";
import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";

const page = () => {
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
