"use client";

import * as React from "react";

// UI
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, ChevronsUpDown, PlusCircle } from "lucide-react";
import { StudentType } from "@/lib/interfaces/student.interface";

const groups = [
  {
    label: "Personal Account",
    teams: [
      {
        label: "Alicia Koch",
        value: "personal",
      },
    ],
  },
  {
    label: "Teams",
    teams: [
      {
        label: "Acme Inc.",
        value: "acme-inc",
      },
      {
        label: "Monsters Inc.",
        value: "monsters",
      },
    ],
  },
];

type Team = (typeof groups)[number]["teams"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface ChildSwitcherProps extends PopoverTriggerProps {
  students: StudentType[];
}

export default function ChildSwitcher({
  students,
  className,
}: ChildSwitcherProps) {
  if (students.length === 0) return null;

  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [selectedChild, setSelectedChild] = React.useState<StudentType>(
    students[0]
  );

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="w-5 h-5 mr-2">
              <AvatarImage
                src={selectedChild?.profileURL || ""}
                alt={selectedChild?.name}
              />
              <AvatarFallback>{selectedChild?.name[0]}</AvatarFallback>
            </Avatar>
            {selectedChild.name}
            <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              {students.map((single) => (
                <CommandItem
                  key={single._id}
                  onSelect={() => {
                    setSelectedChild(single);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Avatar className="w-5 h-5 mr-2">
                    <AvatarImage
                      src={selectedChild?.profileURL || ""}
                      alt={single.name}
                      className="grayscale"
                    />
                    <AvatarFallback>{selectedChild?.name[0]}</AvatarFallback>
                  </Avatar>
                  {selectedChild.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedChild._id === single._id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Add Student
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new student</DialogTitle>
          <DialogDescription>
            Add a new student to enroll in the Umonics.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="py-2 pb-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Child's full name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Child's date of birth</Label>
              <Input id="dob" type="date" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
