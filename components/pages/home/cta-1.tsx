"use client";
import React from "react";

// UI
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const CTA_ONE = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full px-64 py-10 bg-white">
      <div className="w-full text-4xl font-black text-left uppercase text-dark-1">
        subscribe
      </div>
      <div className="font-bold text-main-500 text-[24rem] flex -mt-20">
        <span className="mt-12">L</span>
        <span className="mb-4">M</span>
        <span className="mt-12">S</span>
      </div>
      <div className="flex flex-col items-start justify-start w-full gap-4 -mt-20">
        <p className="max-w-sm font-medium text-left text-dark-1">
          Unlock your child's potential with our engaging and interactive
          classes.
        </p>
        <div className="flex gap-2">
          <Button type="button">Sign Up</Button>
          <Button type="button" variant={"outline"}>
            Learn More{" "}
            <span className="">
              <ChevronRight />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA_ONE;
