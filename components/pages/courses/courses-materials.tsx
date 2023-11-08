"use client";
import React, { useEffect, useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import {
  addMaterial,
  deleteMaterial,
  fetchMaterialsByAttendanceId,
} from "@/lib/actions/material.action";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";

// UI
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusSquare, Trash } from "lucide-react";
import Modal from "@/components/modals/modal";
import { Input } from "@/components/ui/input";
import DialogBox from "@/components/modals/dialog";
import { Button } from "@/components/ui/button";
import { refreshPage } from "@/utils/helpers/refreshPage";


const CoursesMaterials = ({ attendance }: { attendance: AttendanceType }) => {
  const [videoLink, setVideoLink] = useState<string>("");
  const [filename, setFileName] = useState<string>("");
  const [materials, setMaterials] = useState<any[]>([]); 

  // Fetch materials when the component mounts or when the attendance prop changes
  useEffect(() => {
    async function fetchMaterials() {
      try {
        const materials = await fetchMaterialsByAttendanceId(attendance); 
        setMaterials(materials);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    }
    fetchMaterials();
  }, [attendance]);

  const handleAddMaterial = async (
    input: string,
    materialType: "link" | "file"
  ) => {
    let fileType: "link" | "file" = materialType;

    if (materialType === "file") {
      const extension = input.split(".").pop();
      if (extension) {
        fileType = extension as "link" | "file";
      }
    }
    try {
      const materialData = {
        attendance: attendance,
        filename: filename,
        materials: input,
        classDate: attendance.date,
        addedDate: new Date(),
        type: fileType,
      };
      const result = await addMaterial(materialData);
      console.log("Material added successfully:", result);
    } catch (error) {
      console.error("Error adding material:", error);
    }
  };

  const handleDeleteMaterial = async (materialId: string) => {
    try {
      const result = await deleteMaterial(materialId);
      console.log("Material deleted successfully:", result);

      const updatedMaterials = await fetchMaterialsByAttendanceId(attendance);
      setMaterials(updatedMaterials);
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-xs p-4 text-white rounded-lg shadow-lg bg-main-700">
      <header className="flex items-center justify-start gap-1 pt-2 pb-4 border-b">
        <span className="text-5xl font-semibold">
          {new Date(attendance.date).getDate()}
        </span>
        <div className="flex flex-col">
          <span className="font-medium">
            {new Date(attendance.date).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </span>
          <span className="font-medium">
            {new Date(attendance.date).toLocaleDateString("en-US", {
              month: "long",
            })}
          </span>
        </div>
      </header>
      <article className="flex-1 w-full mt-4 overflow-hidden">
        <ScrollArea className="w-full h-[20rem] p-2">
          <ul className="flex flex-col w-full h-full gap-2">
            {materials.map((material) => (
              <li
                key={material._id}
                className="flex items-center justify-start gap-2 px-4 py-2 text-sm transition rounded-full hover:bg-slate-50 hover:text-black"
              >
                <DialogBox
                  title="Are you sure you want to delete this material"
                  description="Deleting this material can't be undone"
                  onCancel={() => {}}
                  onSubmit={() => handleDeleteMaterial(material._id)}
                >
                  <Button
                    variant={"ghost"}
                    className="p-1 rounded-full w-7 h-7"
                  >
                    <Trash className="w-full h-full" />
                  </Button>
                </DialogBox>
                <a
                  href={material.materials}
                  className="cursor-pointer hover:underline line-clamp-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {material.filename}
                </a>
                <span className="text-sm cursor-default">
                  {material.type === "link" ? "Link" : material.type.toUpperCase()}
                </span>
              </li>
            ))}

            <Modal
              description="Choose a file to upload (.pdf, .jpg, .png)"
              title="New Material"
              handleSubmit={() => handleAddMaterial(videoLink, "link")}
              trigger={
                <button className="flex items-end justify-center gap-2 py-3 mt-4 text-black transition rounded-full bg-slate-50 hover:bg-main-100">
                  <PlusSquare className="w-6" />
                  <span className="">Add New Material</span>
                </button>
              }
            >
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Input
                    id="fileName"
                    type="text"
                    value={filename}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="Enter File/link name"
                  />
                  <UploadButton
                    className="border border-dash"
                    endpoint="courseAttachment"
                    appearance={{
                      button: {
                        background: "#639EF8",
                        padding: "2rem",
                      },
                    }}
                    onClientUploadComplete={async (res) => {
                      if (res) {
                        const url = res[0].url;
                        handleAddMaterial(url, "file");
                        alert("Upload Success!")
                        refreshPage()
                      }
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />

                  <span className="text-center">or</span>
                  <Input
                    id="material"
                    type="text"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    placeholder="Enter link for video"
                  />
                </div>
              </div>
            </Modal>
          </ul>
        </ScrollArea>
      </article>
    </div>
  );
};

export default CoursesMaterials;
