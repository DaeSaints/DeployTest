"use client";
import { OurFileRouter } from "@/app/(routes)/api/uploadthing/core";
import { generateComponents } from "@uploadthing/react";
import { UTApi } from "uploadthing/server";
 
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();



export const utapi = new UTApi();
