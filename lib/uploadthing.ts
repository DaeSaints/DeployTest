"use client";
import { OurFileRouter } from "@/app/(routes)/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { generateComponents } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
