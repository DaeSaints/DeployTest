import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="h-[calc(100vh-80px)] bg-white flex flex-col items-center pt-10 justify-between relative">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className={`font-extrabold capitalize text-[9.8rem] text-main-500`}>
          UMONICS
        </h1>
        <p className={`max-w-xl -mt-6 text-lg font-medium text-center`}>
          Discover a unique approach to early childhood education that nurtures
          growth and development.
        </p>
        <Link href={"/authenticate/sign-up"}>
          <Button type="button" className="mt-6" variant={"outline"}>
            Get Started{" "}
            <span className="">
              <ChevronRight />
            </span>
          </Button>
        </Link>
      </div>
      <div className="flex items-center w-full h-20 p-2 bg-main-500">
        <p className="text-4xl font-bold text-white uppercase">
          LEARNING MANAGEMENT SYSTEM DESIGNED FOR CHILDREN
        </p>
      </div>
      <div className="absolute z-20 flex flex-col items-center justify-start gap-4 p-4 rounded-lg shadow-md shadow-main-400/20 translate-x-1/4 -bottom-32 left-1/4 w-72 bg-dark-2 h-96 -rotate-6">
        <div className="bg-main-400 w-full flex-[5] rounded-lg"></div>
        <div className="flex flex-col items-start justify-center flex-1 w-full text-left text-white">
          <span className="text-sm">Nursery 2</span>
          <h3 className="font-medium">Tiger Class</h3>
        </div>
      </div>
      <div className="absolute z-10 flex flex-col items-center justify-start gap-4 p-4 translate-x-1/2 rounded-lg shadow-md shadow-main-400/20 -bottom-36 right-1/2 w-72 bg-dark-2 h-96">
        <div className="bg-main-400 w-full flex-[5] rounded-lg"></div>
        <div className="flex flex-col items-start justify-center flex-1 w-full text-left text-white">
          <span className="text-sm">Nursery 1</span>
          <h3 className="font-medium">Elephant Class</h3>
        </div>
      </div>
      <div className="absolute z-0 flex flex-col items-center justify-start gap-4 p-4 rounded-lg shadow-md shadow-main-400/20 translate-x-1/4 -bottom-28 left-1/2 w-72 bg-dark-2 h-96 rotate-12">
        <div className="bg-main-400 w-full flex-[5] rounded-lg"></div>
        <div className="flex flex-col items-start justify-center flex-1 w-full text-left text-white">
          <span className="text-sm">Kinder 2</span>
          <h3 className="font-medium">Sea Horse Class</h3>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
