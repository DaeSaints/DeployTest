"use client";

import { ourFileRouter } from "@/app/(routes)/api/uploadthing/core";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "../ui/button";
import { useState } from "react";
// import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const { startUpload } = useUploadThing("profileImage", {
    onClientUploadComplete: () => {
      alert("Upload Completed");
    },
  });
  return (
    <>
      <input
        type="file"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setSelectedFile([file]);
        }}
      />
      <Button onClick={() => startUpload(selectedFile)}>Upload</Button>
    </>
    // <UploadDropzone
    //   endpoint={endpoint}
    //   onClientUploadComplete={(res) => {
    //     onChange(res?.[0].url);
    //   }}
    //   onUploadError={(error: Error) => {
    //     alert(`${error?.message}`);
    //   }}
    // />
  );
};
