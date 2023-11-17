"use client";
import { OurFileRouter } from "@/app/(routes)/api/uploadthing/core";
import { generateComponents } from "@uploadthing/react";
import { UTApi } from "uploadthing/server";
import { generateReactHelpers } from "@uploadthing/react/hooks";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();




export const utapi = new UTApi();
