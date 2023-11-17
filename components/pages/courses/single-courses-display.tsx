"use client";
import React, { useEffect, useState } from "react";
import {
  fetchAttendances,
  fetchFilterAttendances,
} from "@/lib/actions/attendance.action";

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
  Loader2,
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
import { useQuery } from "@tanstack/react-query";

const CourseDisplay = ({
  selectedTab,
  page,
  setPage,
}: {
  selectedTab: string;
  page: number;
  setPage: Function;
}) => {
  const [selectedClass, setSelectedClass] = useState<any>(undefined);
  const [selectedOption, setSelectedOption] = useState<
    "Attendance" | "Materials" | undefined
  >(undefined);
  const [pageCount, setPageCount] = useState(0);

  function handlePrevious() {
    setPage((p: number) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p: number) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }
  const { data: attendances, isLoading } = useQuery({
    queryKey: ["attendances", { selectedTab, page }], // Include 'page' in the queryKey
    queryFn: async () => {
      const { attendances } = await fetchFilterAttendances({
        pageNumber: page,
        pageSize: 5,
        filter: selectedTab,
      });
      return attendances;
    },
    refetchInterval: 1000,
  });
  /*
  const [attendances, setAttendances] = useState<AttendanceType[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the attendances data
        const { attendances } = await fetchFilterAttendances(selectedTab);
        setAttendances(attendances);
      } catch (error) {
        console.error("Error fetching attendances", error);
      }
    }

    fetchData();
  }, [selectedTab]);
*/
  return (
    <div className="flex flex-1 w-full h-full gap-4">
      {selectedClass && selectedOption === "Attendance" && (
        <CoursesAttendance attendance={selectedClass}/>
      )}
      {selectedClass && selectedOption === "Materials" && (
        <CoursesMaterials attendance={selectedClass} />
      )}
      <ScrollArea className="flex-grow w-full overflow-y-auto h-[28rem] pr-4">
        <div className="flex flex-col flex-1 w-full gap-6">
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
            </>
          ) : (
            <>
              {attendances && attendances.length > 0 ? (
                attendances?.map((attendance, index) => {
                  return (
                    <div
                      className="flex w-full py-4 transition border rounded-lg shadow hover:bg-slate-50"
                      key={index}
                    >
                      <div className="flex flex-col items-center justify-center w-32 gap-1 border-r">
                        <span className="font-medium">
                          {new Date(attendance.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              weekday: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                        <span className="text-5xl font-semibold">
                          {new Date(attendance.date).getDate()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between w-full gap-4 px-8">
                        <div className="flex items-center justify-between flex-1 pr-8">
                          <div className="flex gap-16">
                            <div className="flex flex-col items-start justify-center gap-2">
                              <div className="flex items-center justify-start gap-4">
                                <Clock className="w-5 h-5" />
                                <span className="">
                                  {attendance.startTime} - {attendance.endTime}
                                </span>
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
                                <span className="">
                                  {attendance.materials
                                    ? `${attendance.materials.length} Materials`
                                    : "No Materials"}
                                </span>
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
                          {attendance.classAttendanceStatus === "pending" && (
                            <Badge className="text-red-700 bg-red-100">
                              Pending for Cancellation
                            </Badge>
                          )}

                          {attendance.classAttendanceStatus === "cancelled" && (
                            <Badge className="text-red-700 bg-red-100">
                              Class Cancelled
                            </Badge>
                          )}
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
                                setSelectedClass(attendance);
                                setSelectedOption("Attendance");
                              }}
                            >
                              <User className="w-4 h-4 mr-2" />
                              <span className="">View Attendance</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer hover:bg-slate-100"
                              onClick={() => {
                                setSelectedClass(attendance);
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
                })
              ) : (
                <div className="text-gray-600">
                  No attendances to show for this tag.
                </div>
              )}
            </>
          )}
        </div>
        <footer>
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              size={"sm"}
              className="flex items-center justify-center gap-2 py-2 mt-4 text-black transition rounded-full bg-slate-50 hover:bg-main-100"
              onClick={handlePrevious}
              disabled={page === 1}
            >
              <span className="flex items-center justify-center">Previous</span>
            </Button>
            <Button
              variant={"outline"}
              size={"sm"}
              className="flex items-center justify-center gap-2 py-2 mt-4 text-black transition rounded-full bg-slate-50 hover:bg-main-100"
              disabled={page === pageCount || isLoading || (attendances && attendances.length === 0)}
              onClick={handleNext}
            >
              <span className="flex items-center justify-center">Next</span>
            </Button>
          </div>
        </footer>
      </ScrollArea>
    </div>
  );
};

export default CourseDisplay;
