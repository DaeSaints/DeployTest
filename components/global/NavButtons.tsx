"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  Backpack,
  BookOpen,
  Calendar,
  LayoutGrid,
  MessagesSquareIcon,
  Settings,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
      <div className="w-full h-20">
        <div className="flex items-center justify-center w-12 h-12 p-1 text-4xl font-bold text-white rounded-full bg-main-300">
          U
        </div>
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
