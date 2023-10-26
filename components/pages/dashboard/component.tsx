"use client";
import { ourFileRouter } from "@/app/(routes)/api/uploadthing/core";
import { FileUpload } from "@/components/global/FileUpload";
// import { Uploader } from "@/lib/uploadthing";
import React from "react";

const DashboardComponent = () => {
  return (
    <div>
      {/* <Uploader
        endpoint="profileImage"
        // needed when server side rendering
        // url="http://localhost:3000"
        onClientUploadComplete={() => {
          alert("Upload Completed");
        }}
      /> */}
      <FileUpload
        endpoint="courseImage"
        onChange={(url) => {
          if (url) {
            alert(url);
            // onSubmit({ imageUrl: url });
          }
        }}
      />
      <div className="mt-4 text-xs text-muted-foreground">
        16:9 aspect ratio recommended
      </div>
    </div>
  );
};

export default DashboardComponent;
