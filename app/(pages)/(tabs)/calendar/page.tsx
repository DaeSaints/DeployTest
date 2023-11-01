import CalendarComponent from "@/components/pages/calendar/component";
import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="flex flex-1 w-full p-4">
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        }
      >
        <CalendarComponent />
      </Suspense>
    </div>
  );
};

export default page;
