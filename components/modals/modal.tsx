import React, { ReactNode } from "react";

// UI
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const Modal = ({
  trigger,
  title,
  description,
  children,
  handleSubmit,
}: {
  trigger: ReactNode;
  children: ReactNode;
  title: string;
  description?: string;
  handleSubmit: () => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-main-600">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className="mt-2 sm:justify-start">
          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
