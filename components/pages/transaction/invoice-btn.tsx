"use client";
import React from "react";
import html2canvas from "html2canvas"; // Make sure to install this library
import jsPDF from "jspdf";

// UI
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { TransactionsType } from "@/lib/interfaces/transaction.interface";

const InvoiceButton = ({transactions} : {transactions: TransactionsType}) => {
  const { toast } = useToast();
  const handleExportInvoice = () => {
    if (!transactions) {
      console.error("Invalid transactions data");
      return;
    }

    try {
      const exportData = {
        transactionId: transactions._id,
      };

      const pdf = new jsPDF();

      pdf.text(`Invoice\nTransaction ID: ${exportData.transactionId}`, 10, 10);
      pdf.save("invoice.pdf");

      console.log("Exporting invoice data:", exportData);

      toast({
        title: "Downloading Invoice",
        description: "Material (PDF)",
      });
    } catch (error) {
      console.error("Error exporting invoice:", error);
    }
  };


  return (
    <Button
      className="absolute flex gap-2 bottom-4 right-4"
      onClick={handleExportInvoice}
    >
      <Download className="w-full h-full" />
      <span className="">Invoice</span>
    </Button>
  );
};

export default InvoiceButton;
