"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRightSquareIcon } from "lucide-react";
import axios from "axios";

const StripeButton = ({ classId }: { classId: string }) => {
  async function handleSubscribe() {
    try {
      const res = await axios.post(`/api/classes/${classId}/checkout`);
      window.location.assign(res.data.url);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button className="py-8 text-2xl font-bold" onClick={handleSubscribe}>
      Enroll Now <ArrowUpRightSquareIcon className="ml-2" />
    </Button>
  );
};

export default StripeButton;
