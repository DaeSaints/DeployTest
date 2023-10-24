import { OurFileRouter } from "@/app/(routes)/api/uploadthing/core";
import { generateComponents } from "@uploadthing/react";

 
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();