// @ts-nocheck
"use client";
import React, { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const AllInclusiveBtn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div className="hidden">
        <stripe-buy-button
          buy-button-id="buy_btn_1OFCUVJdrjeVG3h14v8ccxp1"
          publishable-key="pk_live_51JtS02JdrjeVG3h1ComVNr82vGBAXYpUPscimAooqw4YYpXI3UzHKmAYDRgbf37YIZ4GDHsjo0Rw1GZev6htsfG700SGmWjXGT"
        ></stripe-buy-button>
      </div>
      <Button
        disabled={isLoading}
        type="button"
        className="w-full py-6 text-base font-bold"
        onClick={() => {
          setIsLoading(true);
          window.open(
            "https://checkout.umonicsplus.com/b/aEUdUg1275PxfCw9AC?locale=en&__embed_source=buy_btn_1OFCUVJdrjeVG3h14v8ccxp1",
            "_blank"
          );
        }}
      >
        Enroll Now
        {isLoading && <Loader2 className="w-6 h-6 ml-2 animate-spin" />}
      </Button>
    </>
  );
};

export default AllInclusiveBtn;
