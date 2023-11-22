import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchSingleClassByID } from "@/lib/actions/class.action";
import { PageProps } from "@/lib/interfaces/page.props";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const NewEnrollmentPage = async ({ params, searchParams }: PageProps) => {
  const { _id } = params;
  const classCourse = await fetchSingleClassByID({ _id });

  if (!classCourse) return null;

  return (
    <section className="flex-1 w-full h-full flex flex-col">
      <header className="flex items-center justify-between w-full h-20 p-10 py-5 border-b">
        <h2 className="text-3xl font-bold tracking-tight text-main-500">
          Class Course
        </h2>
        <Link href={"/dashboard"}>
          <Button type="button">
            <ChevronLeft className="mr-2" /> Back to menu
          </Button>
        </Link>
      </header>
      <article className="flex-1 p-10 grid grid-cols-5 grid-rows-1 gap-10">
        <div className="col-span-2 bg-main-300 rounded-xl"></div>
        <div className="col-span-3 flex flex-col rounded-xl">
          <div className="text-4xl font-semibold text-dark-2 uppercase">
            {classCourse.class} Class
          </div>
          <div className="flex gap-2 justify-start items-center mt-1">
            <Badge variant={"outline"} className="px-4 py-2">
              {classCourse.startTime} am - {classCourse.endTime} am
            </Badge>
            <Badge variant={"outline"} className="px-4 py-2">
              {classCourse.repeatedDays?.join(", ")}
            </Badge>
          </div>
        </div>
      </article>
    </section>
  );
};

export default NewEnrollmentPage;
