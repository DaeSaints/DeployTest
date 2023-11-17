"use client";
import React from "react";
import html2canvas from "html2canvas"; // Make sure to install this library
import jsPDF from "jspdf";

// UI
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { TransactionsType } from "@/lib/interfaces/transaction.interface";
import { duration } from "html2canvas/dist/types/css/property-descriptors/duration";

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
        price: transactions.price,
        duration: transactions.duration,
        student: transactions.student.name,
        datepaid: transactions.paidDate,
        expirydate: transactions.expiryDate,
        status: transactions.status
      };

      const pdf = new jsPDF();

      pdf.text(`Invoice\n
                Transaction ID: ${exportData.transactionId}\n
                Transaction Status: ${exportData.status}\n
                Date Paid: ${exportData.datepaid?.toLocaleDateString()}\n
                For student: ${exportData.student}\n
                Valid For: ${exportData.duration}\n
                Valid Until: ${exportData.expirydate?.toLocaleDateString()}\n
                $${exportData.price} paid on ${exportData.datepaid?.toDateString()}`, 10, 10);
      pdf.save("invoice.pdf");

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
