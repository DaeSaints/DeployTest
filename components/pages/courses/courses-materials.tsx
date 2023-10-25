"use client";
import React, { useState } from "react";

// UI
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusSquare, Trash } from "lucide-react";
import Modal from "@/components/modals/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DialogBox from "@/components/modals/dialog";

const CoursesMaterials = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  function handleSubmitNewMaterial() {}
  function handleDeleteMaterial() {
    setIsDelete(false);
  }
  return (
    <div className="flex flex-col w-full max-w-xs p-4 text-white rounded-lg shadow-lg bg-main-700">
      <header className="flex items-center justify-start gap-1 pt-2 pb-4 border-b">
        <span className="text-5xl font-semibold">28</span>
        <div className="flex flex-col">
          <span className="">Wed</span>
          <span className="">January</span>
        </div>
      </header>
      <article className="flex-1 w-full mt-4 overflow-hidden">
        <ScrollArea className="w-full h-[20rem] p-2">
          <ul className="flex flex-col w-full h-full gap-2">
            <li className="flex items-center justify-start gap-2 px-4 py-2 text-sm transition rounded-full hover:bg-slate-50 hover:text-black">
              <DialogBox
                title="Are you sure you want to delete this material"
                description="Deleting this material can't be undone"
                onCancel={() => setIsDelete(false)}
                onSubmit={handleDeleteMaterial}
              >
                <Button variant={"ghost"} className="p-1 rounded-full w-7 h-7">
                  <Trash className="w-full h-full" />
                </Button>
              </DialogBox>
              <span className="cursor-pointer hover:underline line-clamp-1">
                kioelopasdhjsv.jpg
              </span>
              <span className="text-sm cursor-default">(Notes)</span>
            </li>
            <Modal
              description="Choose a file to upload (.pdf, .jpg, .png)"
              title="New Material"
              handleSubmit={handleSubmitNewMaterial}
              trigger={
                <button className="flex items-end justify-center gap-2 py-3 mt-4 text-black transition rounded-full bg-slate-50 hover:bg-main-100">
                  <PlusSquare className="w-6" />
                  <span className="">Add New Material</span>
                </button>
              }
            >
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Input id="material" type="file" />
                  <span className="text-center">or</span>
                  <Input
                    id="material"
                    type="text"
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
