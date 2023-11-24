"use client";
import React from "react";

// UI
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const NonAcceptedHeader = ({
  length,
  clear,
}: {
  length: number;
  clear: () => void;
}) => {
  const router = useRouter();

  return (
    <header className="flex flex-col px-10 pb-4 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-medium tracking-tight">
            Welcome to Umonics!
          </h2>
          <p className="text-muted-foreground">
            Create your class schedule before enrolling. You can only choose 1
            class per week
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={"outline"}
            type="button"
            disabled={length === 0}
            onClick={clear}
            className="py-6 text-base font-bold"
          >
            Clear Schedule <Trash2 className="ml-2" />
          </Button>
          <Button
            type="button"
            disabled={length === 0}
            onClick={() => {
              router.push("/dashboard/new-enrollment/subscription");
            }}
            className="py-6 text-base font-bold"
          >
            Continue Enrollment <ArrowUpRight className="ml-2" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NonAcceptedHeader;
