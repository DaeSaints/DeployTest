"use client";
import React from "react";

// UI
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ClassCard } from "./card/class";

// BACKEND
import { ParentType } from "@/lib/interfaces/parent.interface";
import useForYouClasses from "./hook/useForYouClasses";
import { StudentType } from "@/lib/interfaces/student.interface";
import BuyButton from "../new-enrollment/BuyButton";

const NotAcceptedSection = ({
  userInfo,
  selectedChild,
}: {
  userInfo: ParentType;
  selectedChild: StudentType;
}) => {
  if (!userInfo?.children) return null;
  const ForYou = useForYouClasses(selectedChild._id as string);

  return (
    <>
      <section className="flex-1 w-full">
        <div className="block">
          <div className="border-t">
            <div className="bg-background">
              <div className="grid lg:grid-cols-5">
                <div className="col-span-5">
                  <div className="h-full px-4 py-6 lg:px-8">
                    <Tabs defaultValue="music" className="h-full space-y-6">
                      <TabsContent
                        value="music"
                        className="p-0 border-none outline-none"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-xl font-semibold tracking-tight">
                              Enroll Now
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Top picks for you.
                            </p>
                          </div>
                        </div>
                        {/* <Separator className="my-4" /> */}
                        <div className="relative">
                          <ScrollArea>
                            <div className="flex pb-4 mt-4 space-x-4">
                              {ForYou.isLoading ? (
                                <>
                                  {Array(5)
                                    .fill([])
                                    .map((_, index) => {
                                      return (
                                        <ClassCard
                                          skeleton
                                          key={index}
                                          className="w-[250px]"
                                          aspectRatio="portrait"
                                          width={250}
                                          height={330}
                                        />
                                      );
                                    })}
                                </>
                              ) : (
                                <>
                                  {ForYou.data?.map((single) => (
                                    <ClassCard
                                      key={single._id}
                                      classCourse={single}
                                      className="w-[250px]"
                                      aspectRatio="portrait"
                                      width={250}
                                      height={330}
                                    />
                                  ))}
                                </>
                              )}
                            </div>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotAcceptedSection;
