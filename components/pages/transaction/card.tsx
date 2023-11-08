import React from "react";

// UI
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import InvoiceButton from "./invoice-btn";

const TransactionCard = () => {
  const today = new Date();
  return (
    <div className="relative flex flex-col w-full h-56 p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between w-full text-2xl">
        <div className="flex items-center justify-start gap-4">
          <h2 className="font-semibold">Invoice</h2>
          <Badge className="h-8 bg-green-400">Paid</Badge>
        </div>
        <h1 className="font-bold">$580.99</h1>
      </div>
      <div className="flex items-center justify-start gap-2 my-4">
        <Calendar className="w-6 h-6" />
        <span className="">{today.toDateString()}</span>
      </div>
      <div className="flex flex-1 w-full gap-4">
        <div className="relative h-full overflow-hidden bg-black rounded-lg aspect-square">
          <Image
            fill
            alt="Class Picture"
            src={
              "https://images.pexels.com/photos/18867498/pexels-photo-18867498/free-photo-of-london-city-fox.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
          />
        </div>
        <div className="flex flex-col flex-1">
          <h3 className="font-bold">Fox Class</h3>
          <span className="">2 Month Duration</span>
        </div>
      </div>
      <InvoiceButton />
    </div>
  );
};

export default TransactionCard;
