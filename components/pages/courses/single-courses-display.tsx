"use client";
import React, { useState } from "react";

// UI
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Book,
  ChevronDown,
  Clock,
  Link2Icon,
  PenBox,
  Plus,
  User,
  Users2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CoursesAttendance from "./courses-attendance";
import CoursesMaterials from "./courses-materials";

const CourseDisplay = () => {
  const [selectedClass, setSelectedClass] = useState<any>(undefined);
  const [selectedOption, setSelectedOption] = useState<
    "Attendance" | "Materials" | undefined
  >(undefined);

  return (
    <div className="flex flex-1 w-full h-full gap-4">
      {selectedClass && selectedOption === "Attendance" && (
        <CoursesAttendance />
      )}
      {selectedClass && selectedOption === "Materials" && <CoursesMaterials />}
      <ScrollArea className="flex-grow w-full overflow-y-auto h-[28rem] pr-4">
        <div className="flex flex-col flex-1 w-full gap-6">
          {Array(10)
            .fill([])
            .map((_, index) => {
              return (
                <div
                  className="flex w-full py-4 transition border rounded-lg shadow hover:bg-slate-50"
                  key={index}
                >
                  <div className="flex flex-col items-center justify-center w-32 gap-1 border-r">
                    <span className="font-medium">Jan/Wed</span>
                    <span className="text-5xl font-semibold">28</span>
                  </div>
                  <div className="flex items-center justify-between w-full gap-4 px-8">
                    <div className="flex items-center justify-between flex-1 pr-8">
                      <div className="flex gap-16">
                        <div className="flex flex-col items-start justify-center gap-2">
                          <div className="flex items-center justify-start gap-4">
                            <Clock className="w-5 h-5" />
                            <span className="">{"9:00 - 9:30"}</span>
                          </div>
                          <div className="flex items-center justify-start gap-4">
                            <Users2 className="w-5 h-5" />
                            <div className="flex -space-x-4">
                              <Avatar className="w-7 h-7 outline outline-white">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-main-100">
                                  KM
                                </AvatarFallback>
                              </Avatar>
                              <Avatar className="w-7 h-7 outline outline-white">
                                <AvatarImage src="https://images.pexels.com/photos/3988680/pexels-photo-3988680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <Avatar className="w-7 h-7 outline outline-white">
                                <AvatarImage src="https://images.pexels.com/photos/4229083/pexels-photo-4229083.jpeg?auto=compress&cs=tinysrgb&w=1600" />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-2">
                          <div className="flex items-center justify-start gap-4">
                            <Book className="w-5 h-5" />
                            <span className="">{2} Materials</span>
                          </div>
                          <div className="flex items-center justify-start gap-4">
                            <Link2Icon className="w-5 h-5" />
                            <a
                              target="_blank"
                              href={`https://dribbble.com/shots/21448800-Tabato-Calendar-app-Bookings`}
                              className="transition hover:underline max-w-[10rem] line-clamp-1"
                            >
                              {
                                "https://dribbble.com/shots/21448800-Tabato-Calendar-app-Bookings"
                              }
                            </a>
                          </div>
                        </div>
                      </div>
                      <Badge className="text-red-700 bg-red-100">
                        Pending for Cancellation
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant={"outline"}>
                          Edit
                          <span className="">
                            <ChevronDown className="w-4 h-4 ml-2" />
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-44"
                        side="bottom"
                        sideOffset={4}
                      >
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-slate-100"
                          onClick={() => {
                            setSelectedClass(_);
                            setSelectedOption("Attendance");
                          }}
                        >
                          <User className="w-4 h-4 mr-2" />
                          <span className="">View Attendance</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-slate-100"
                          onClick={() => {
                            setSelectedClass(_);
                            setSelectedOption("Materials");
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          <span className="">Add Material</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-slate-100">
                          <PenBox className="w-4 h-4 mr-2" />
                          <span className="">Edit Zoom</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-slate-100">
                          <XCircle className="w-4 h-4 mr-2" />
                          <span className="">Cancel Class</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CourseDisplay;
