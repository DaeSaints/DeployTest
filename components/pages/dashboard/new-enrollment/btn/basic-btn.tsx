// @ts-nocheck
"use client";
import React, { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const LessonsOnlyBtn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div className="hidden">
        <stripe-buy-button
          buy-button-id="buy_btn_1OFCYgJdrjeVG3h12HCb9Z3C"
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
            "https://checkout.umonicsplus.com/b/8wMdUgbGL6TB4XS003?locale=en&__embed_source=buy_btn_1OFCYgJdrjeVG3h12HCb9Z3C",
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

export default LessonsOnlyBtn;
