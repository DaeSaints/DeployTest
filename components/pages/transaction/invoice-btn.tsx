"use client";
import React from "react";

// UI
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const InvoiceButton = () => {
  const { toast } = useToast();

  return (
    <Button
      className="absolute flex gap-2 bottom-4 right-4"
      onClick={() => {
        console.log("object");
        toast({
          title: "Downloading Invoice",
          description: "Material kioelopasdhjsv.jpg",
        });
      }}
    >
      <Download className="w-full h-full" />
      <span className="">Invoice</span>
    </Button>
  );
};

export default InvoiceButton;
