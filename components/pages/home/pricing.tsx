"use client";
import React from "react";

// UI
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full gap-12 px-24 py-20 bg-main-500">
      <div className="flex flex-col gap-4 text-center text-white">
        <span className="font-medium">Affordable</span>
        <div className="text-5xl font-bold text-white">Subscription Plans</div>
        <p className="">
          Unlock your child's potential with our affordable pricing options.
        </p>
      </div>
      <div className="grid w-full grid-cols-3 grid-rows-1 gap-10">
        <div className="w-full px-6 py-10 bg-white shadow-lg rounded-2xl">
          <p className="text-3xl font-bold text-black">Elephant Class</p>
          <p className="mb-4 text-sm text-gray-500">
            Nursery 1 - (2yrs - 3yrs)
          </p>
          <div className="flex items-end w-full gap-2 my-4">
            <div className="flex-[3] bg-main-300 rounded-lg h-48"></div>
            <div className="flex flex-col flex-1">
              <p className="text-3xl font-bold text-black">$250</p>
              <p className="mb-4 text-sm text-gray-500">per month</p>
            </div>
          </div>
          <Button
            type="button"
            variant={"outline"}
            className="w-full py-4 shadow"
          >
            Get Started
          </Button>
          <span className="block w-full h-1 my-2 bg-gray-100 rounded-lg"></span>
          <ul className="w-full mt-6 mb-6 text-sm text-black dark:text-white">
            <li className="flex items-center mb-3 space-x-2">
              <CheckCircle className="text-green-400" />
              <div>Algebra</div>
            </li>
            <li className="flex items-center mb-3 space-x-2">
              <CheckCircle className="text-green-400" />
              <div>Problem Solving</div>
            </li>
            <li className="flex items-center mb-3 space-x-2">
              <CheckCircle className="text-green-400" />
              <div>Language Skills</div>
            </li>
          </ul>
        </div>
        <div className="w-full px-6 py-10 bg-white shadow-lg rounded-2xl">
          <p className="text-3xl font-bold text-black">Tiger Class</p>
          <p className="mb-4 text-sm text-gray-500">
            Nursery 2 - (3yrs - 4yrs)
          </p>
          <div className="flex items-end w-full gap-2 my-4">
            <div className="flex-[3] bg-main-300 rounded-lg h-48"></div>
            <div className="flex flex-col flex-1">
              <p className="text-3xl font-bold text-black">$350</p>
              <p className="mb-4 text-sm text-gray-500">per month</p>
            </div>
          </div>
          <Button
            type="button"
            variant={"outline"}
            className="w-full py-4 shadow"
          >
            Get Started
          </Button>
          <span className="block w-full h-1 my-2 bg-gray-100 rounded-lg"></span>
          <ul className="w-full mt-6 mb-6 text-sm text-black dark:text-white">
            <li className="flex items-center mb-3 space-x-2">
              <CheckCircle className="text-green-400" />
              <div>English Communication</div>
            </li>
            <li className="flex items-center mb-3 space-x-2">
              <CheckCircle className="text-green-400" />
              <div>Problem Solving</div>
            </li>
            <li className="flex items-center mb-3 space-x-2">
              <CheckCircle className="text-green-400" />
              <div>Language Skills</div>
            </li>
          </ul>
        </div>
        <div className="w-full px-6 py-10 bg-white shadow-lg rounded-2xl">
          <p className="text-3xl font-bold text-black">Lion Class</p>
          <p className="mb-4 text-sm text-gray-500">Kinder 1 - (4yrs - 5yrs)</p>
          <div className="flex items-end w-full gap-2 my-4">
            <div className="flex-[3] bg-main-300 rounded-lg h-48"></div>
            <div className="flex flex-col flex-1">
              <p className="text-3xl font-bold text-black">$450</p>
              <p className="mb-4 text-sm text-gray-500">per month</p>
            </div>
          </div>
          <Button
            type="button"
            variant={"outline"}
            className="w-full py-4 shadow"
          >
            Get Started
          </Button>
          <span className="block w-full h-1 my-2 bg-gray-100 rounded-lg"></span>
          <ul className="w-full mt-6 mb-6 text-sm text-black dark:text-white">
            <li className="flex items-center mb-3 space-x-2">
              <CheckCircle className="text-green-400" />
              <div>Algebraic Expressions</div>
            </li>
            <li className="flex items-center mb-3 space-x-2">
              <CheckCircle className="text-green-400" />
              <div>Problem Solving</div>
            </li>
            <li className="flex items-center mb-3 space-x-2">
              <CheckCircle className="text-green-400" />
              <div>Language Skills</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
