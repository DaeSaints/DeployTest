import MessagesComponent from "@/components/pages/messages/messages-component";
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
        <MessagesComponent />
      </Suspense>
    </>
  );
};

export default page;
