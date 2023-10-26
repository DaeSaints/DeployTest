"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import ProgressPage from "./progressbar";
import { User } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
const PageThree = ({
  page,
  totalPages,
  selectedImageOrig,
  handlerPageThree,
}: {
  page: number;
  totalPages: number;
  selectedImageOrig: string | undefined;
  handlerPageThree: (img: string | undefined, file: File[]) => void;
}) => {
  //   FILE
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const file = e.target.files && e.target.files;
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        handlerPageThree(reader.result as string, selectedFiles);
      };

      reader.readAsDataURL(file[0]);
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
            <div>
              <Input type="file" onChange={handleFileChange} />
              <div className="mt-4 text-xs text-muted-foreground">
                16:9 aspect ratio recommended
              </div>
            </div>

            {/* <Input type="file" onChange={handleFileChange} /> */}
            {/* <UploadButton
              className="border border-dash"
              endpoint="profileImage"
              onClientUploadComplete={async (res) => {
                if (res) {
                  const fetchedImage = await fetchUpload(res[0].url);

                  handlerPageThree(fetchedImage as string, res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            /> */}
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
