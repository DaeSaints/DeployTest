"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

// UI
import { Button } from "../ui/button";
import {
  Backpack,
  BookOpen,
  Calendar,
  LayoutGrid,
  MessagesSquareIcon,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import TooltipButton from "./TooltipButton";

const NavButtons = () => {
  const pathname = usePathname();
  const router = useRouter();
  const NavLinks = [
    { label: "dashboard", href: "/dashboard" },
    { label: "calendar", href: "/calendar" },
    { label: "courses", href: "/courses" },
    { label: "messages", href: "/messages" },
    { label: "transactions", href: "/transactions" },
    { label: "settings", href: "/settings" },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full h-20 pt-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={"right"}
            className="mt-6 w-80"
            sideOffset={8}
          >
            <DropdownMenuLabel className="flex items-center justify-start">
              <div className="flex flex-col">
                <span className="font-semibold">kielo@gmail.com</span>
                <span className="font-normal text-slate-600">Parent</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center justify-start cursor-pointer">
              <Avatar className="mr-4">
                <AvatarImage
                  src="https://images.pexels.com/photos/4298629/pexels-photo-4298629.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="@shadcn"
                />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold capitalize">Brent Mercado</span>
                <span className="font-normal text-slate-600">
                  K2 - Elephant Class
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-start cursor-pointer">
              <Avatar className="mr-4">
                <AvatarImage
                  src="https://images.pexels.com/photos/5119214/pexels-photo-5119214.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="@shadcn"
                />
                <AvatarFallback>KM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold capitalize">Klark Mercado</span>
                <span className="font-normal text-slate-600">
                  N1 - Unenrolled
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {NavLinks.map((nav) => {
        const isActive =
          (pathname.includes(nav.href) && nav.href.length > 1) ||
          pathname === nav.href;
        const iconClassName = `w-full h-full transition text-slate-400  ${
          isActive ? "text-black" : "group-hover:text-white"
        }`;
        return (
          <TooltipButton tooltip={nav.label}>
            <Button
              key={nav.label}
              variant={"ghost"}
              className={`w-10 h-10 p-2 rounded-full group relative ${
                isActive ? "bg-white" : "hover:bg-primary/50"
              }`}
              onClick={() => {
                router.replace(nav.href);
              }}
            >
              {isActive && (
                <div className="absolute -left-4 w-[4px] h-full bg-white transition animate-in"></div>
              )}
              {nav.label === "dashboard" && (
                <LayoutGrid className={iconClassName} />
              )}
              {nav.label === "calendar" && (
                <Calendar className={iconClassName} />
              )}
              {nav.label === "courses" && (
                <Backpack className={iconClassName} />
              )}
              {nav.label === "messages" && (
                <MessagesSquareIcon className={iconClassName} />
              )}
              {nav.label === "transactions" && (
                <BookOpen className={iconClassName} />
              )}
              {nav.label === "settings" && (
                <Settings className={iconClassName} />
              )}
            </Button>
          </TooltipButton>
        );
      })}
    </div>
  );
};

export default NavButtons;
