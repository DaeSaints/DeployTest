import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchSingleClassByID } from "@/lib/actions/class.action";
import { PageProps } from "@/lib/interfaces/page.props";
import { convertTime } from "@/utils/helpers/convertTime";
import Link from "next/link";
import React from "react";

// UI
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock1, Link2, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NewEnrollmentSidebar from "@/components/pages/dashboard/new-enrollment/right-sidebar";
import { Card, CardContent } from "@/components/ui/card";

const NewEnrollmentPage = async ({ params, searchParams }: PageProps) => {
  const { _id } = params;
  const classCourse = await fetchSingleClassByID({ _id: _id as string });

  if (!classCourse) return null;
  const classTime = convertTime(classCourse.startTime, classCourse.endTime);
  const GRADE = {
    N1: "2-3 years",
    N2: "3-4 years",
    K1: "4-5 years",
    K2: "5-6 years",
  };
  const grade_level = GRADE[classCourse.ageGroup];
  return (
    <section className="flex flex-col flex-1 w-full h-full">
      <article className="grid flex-1 grid-cols-10 grid-rows-1">
        <div className="col-span-7 border-r border-r-slate-300">
          <ScrollArea className="w-full h-screen px-14">
            <div className="flex items-center justify-start gap-2 pt-10 text-base font-medium text-muted-foreground">
              <Link href={"/dashboard"}>
                <div className="transition-colors hover:text-dark-1">
                  Class Courses
                </div>
              </Link>
              <div className="">/</div>
              <Link href={`/dashboard/new-enrollment/${_id}`}>
                <div className="text-dark-1">{classCourse.class}</div>
              </Link>
            </div>
            <h1 className="mt-6 text-4xl font-medium uppercase text-dark-2">
              {classCourse.class} Class
            </h1>
            <div className="w-full h-[23rem] rounded-lg shadow-md bg-main-500 my-6"></div>
            <Card className="mb-4">
              <CardContent className="p-4">
                <Tabs defaultValue="Description" className="w-full pb-6">
                  <TabsList className="space-x-4">
                    <TabsTrigger value="Description">Description</TabsTrigger>
                    <TabsTrigger value="Details">Details</TabsTrigger>
                    <TabsTrigger value="Instructor">Instructor</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Description" className="pt-2 pl-4">
                    <p className="max-w-2xl text-sm text-muted-foreground">
                      Unlock the power of your brain in our exciting Memory
                      Masters Junior class! Designed for young minds eager to
                      explore the fascinating world of memory, this course is a
                      fun and interactive journey into the art and science of
                      remembering.
                    </p>
                  </TabsContent>
                  <TabsContent value="Details" className="pt-2 pl-4">
                    <ul className="grid grid-cols-4 grid-rows-1">
                      <li className="flex items-center justify-start gap-2">
                        <User2 className="" />
                        <p className="text-sm text-muted-foreground">
                          {grade_level} of age
                        </p>
                      </li>
                      <li className="flex items-center justify-start gap-2">
                        <Clock1 className="" />
                        <p className="text-sm text-muted-foreground">
                          {classTime}
                        </p>
                      </li>
                      <li className="flex items-center justify-start gap-2">
                        <Calendar className="" />
                        <p className="text-sm text-muted-foreground">
                          Every {classCourse.repeatedDays?.join(", ")}
                        </p>
                      </li>
                      <li className="flex items-center justify-start gap-2">
                        <Link2 className="" />
                        <p className="text-sm text-muted-foreground">Zoom</p>
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="Instructor" className="pt-2 pl-4">
                    <div className="flex items-center justify-start gap-2">
                      <Avatar className="w-14 h-14">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <h3 className="font-medium">Teacher John Doe</h3>
                        <p className="text-sm text-muted-foreground">
                          Umonics Method Teacher
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </ScrollArea>
        </div>
        <NewEnrollmentSidebar
          classId={_id as string}
          ageGroup={classCourse.ageGroup}
          repeatedDays={classCourse.repeatedDays as string[]}
        />
      </article>
    </section>
  );
};

export default NewEnrollmentPage;
