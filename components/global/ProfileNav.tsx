"use client";
import React, { useState } from "react";

const ProfileNav = () => {
  const [temp, settemp] = useState(0);
  return (
    <div className="flex gap-2 justify-center items-center">
      <span className="">Kielo</span>
      <button
        onClick={() => settemp((prev) => prev + 1)}
        className="w-10 h-10 rounded-full bg-black text-white font-bold flex justify-center items-center"
      >
        {temp}
      </button>
    </div>
  );
};

export default ProfileNav;
