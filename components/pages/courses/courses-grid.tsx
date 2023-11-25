"use client";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Loader2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CoursesSelection = () => {
  const { selectedChild } = useSelectedChild();
  if (selectedChild?.status === "Enrolling")
    return (
      <div className="flex items-center justify-center flex-1">
        <p className="">Waiting for Payment</p>
      </div>
    );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollArea className="w-full h-[32rem] bg-slate-200">
      <div className="grid flex-1 w-full grid-flow-row grid-cols-4 gap-4 p-4">
        {isLoading ? (
          <>
            {Array(2)
              .fill([])
              .map((_, index) => {
                return (
                  <div
                    key={index}
                    className="w-full h-[14rem] rounded-lg shadow-md bg-white/80 animate-pulse flex-col flex"
                  >
                    <div className="flex-[8] w-full py-3 px-4">
                      <div className="w-32 h-10 text-lg bg-slate-200 animate-pulse" />
                    </div>
                    <div className="w-full flex-[5] flex gap-8 px-4 py-3">
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-xl font-semibold"></span>
                          <User className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="text-xs">Students</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-xl font-semibold"></span>
                          <Book className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="text-xs">Materials</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        ) : (
          <>
            {Array(2)
              .fill([])
              .map((_, index) => {
                return (
                  <Link
                    href={`/courses/${"123"}`}
                    key={index}
                    className="w-full h-[14rem] bg-white rounded-lg shadow-md flex flex-col relative overflow-hidden cursor-pointer group hover:opacity-70 transition"
                  >
                    <div className="flex-[13] w-full bg-main-300 py-3 px-4 relative overflow-hidden">
                      <Image
                        fill
                        style={{ objectFit: "cover" }}
                        className="brightness-75"
                        alt="Elephant"
                        src={
                          "https://images.pexels.com/photos/8363771/pexels-photo-8363771.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        }
                      />
                      <span className="text-lg font-bold text-white drop-shadow-lg">
                        Elephant Class
                      </span>
                    </div>
                    <div className="w-full flex-[5] flex gap-8 px-4 py-3">
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-xl font-semibold">4</span>
                          <User className="w-6 h-6 text-main-600" />
                        </div>
                        <p className="text-xs">Students</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-xl font-semibold">10</span>
                          <Book className="w-6 h-6 text-main-600" />
                        </div>
                        <p className="text-xs">Materials</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </>
        )}
      </div>
    </ScrollArea>
  );
};

export default CoursesSelection;
