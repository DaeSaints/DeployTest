"use client";
import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProgressPage from "./progressbar";
import { User } from "lucide-react";
import Image from "next/image";
const PageThree = ({
  page,
  totalPages,
  selectedImageOrig,
  handlerPageThree,
}: {
  page: number;
  totalPages: number;
  selectedImageOrig: string | undefined;
  handlerPageThree: (img: string | undefined) => void;
}) => {
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        handlerPageThree(result);
      };
      reader.readAsDataURL(file);
    } else {
      // Display an error message or handle the case when a non-image file is selected.
    }
  };
  return (
    <>
      <div className="flex flex-col w-full">
        <ProgressPage page={page} totalPages={totalPages} />
        <p className="max-w-[35rem] text-4xl text-black font-medium my-4">
          Let's finish it up by uploading a profile picture!
        </p>
      </div>
      <div className="flex items-start justify-start flex-1 w-full">
        <div className="flex flex-col items-start justify-start gap-10 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="profile-pic" className="text-xl font-medium">
              Profile Picture
            </Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="profile-pic"
              className="p-3 text-2xl h-fit"
              placeholder="Enter your Password"
            />
          </div>
        </div>
        <div className="relative flex items-center justify-center ml-20 overflow-hidden rounded-full w-80 h-80 outline outline-main-300">
          {selectedImageOrig ? (
            <Image src={selectedImageOrig} alt="Profile Picture" fill />
          ) : (
            <User className="w-40 h-40 text-main-300" />
          )}
        </div>
      </div>
    </>
  );
};

export default PageThree;
