"use client";
import React from "react";
import ProfileNav from "./ProfileNav";

const Navbar = () => {
  return (
    <nav className="w-full px-4 py-2 bg-blue-400 flex justify-between items-center">
      <h1 className="">Umonics</h1>
      <ul className="flex gap-2 items-center justify-center">
        <li className="">Home</li>
        <li className="">Dashboard</li>
        <li className="">Admin</li>
      </ul>
      <ProfileNav />
    </nav>
  );
};

export default Navbar;
