"use client";

// UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  ChevronDownIcon,
  CircleIcon,
  Lock,
  Replace,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// BACKEND
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { convertTime } from "@/utils/helpers/convertTime";
import dayjs from "dayjs";
import React from "react";

export function NextClassCard({
  attendance,
  index,
}: {
  index: number;
  attendance: AttendanceType;
}) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  const today = dayjs();
  const time = attendance.endTime.split(":");
  const ThreeDaysBefore = dayjs(attendance.date)
    .set("day", dayjs(attendance.date).day() - 3)
    .set("hour", Number(time[0]))
    .set("minute", Number(time[1]));

  const closed =
    today.isBefore(ThreeDaysBefore) || today.isAfter(ThreeDaysBefore);

  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{dayjs(attendance.date).format("dddd")}</CardTitle>
          <CardDescription className="text-xs">
            {convertTime(attendance.startTime, attendance.endTime)}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button
            variant="secondary"
            className="flex items-center justify-center px-2 shadow-none"
          >
            <Check className="w-3 h-3 mr-2" />
            <span className="text-xs">Going?</span>
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />
          <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="secondary" className="px-2 shadow-none">
                  <ChevronDownIcon className="w-4 h-4 text-secondary-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0">
                <Command>
                  {/* <CommandList></CommandList>
                  <CommandSeparator /> */}
                  <CommandList>
                    <CommandGroup>
                      <DialogTrigger asChild>
                        <CommandItem
                          onSelect={() => {
                            setOpen(false);
                            setShowNewTeamDialog(true);
                          }}
                          disabled={closed}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div
                              className={`flex gap-2 ${
                                closed && "text-muted-foreground"
                              }`}
                            >
                              <Replace className="w-5 h-5" />
                              Change Class
                            </div>
                            {closed && (
                              <Lock className="w-5 h-5 ml-2 text-muted-foreground" />
                            )}
                          </div>
                        </CommandItem>
                      </DialogTrigger>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change your class</DialogTitle>
                <DialogDescription>
                  You can only change class 3 day before the actual class.
                </DialogDescription>
              </DialogHeader>
              <div></div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between w-full space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="w-3 h-3 mr-1 fill-main-400 text-main-400" />
            {attendance.class.class} ({attendance.ageGroup})
          </div>

          <div>{attendance.date.toDateString()}</div>
        </div>
      </CardContent>
    </Card>
  );
}
