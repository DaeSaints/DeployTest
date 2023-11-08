import React from "react";

// UI
import TransactionTopBar from "@/components/pages/transaction/topbar";
import { Toaster } from "@/components/ui/toaster";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col flex-1 w-full h-full bg-slate-100">
      <Toaster />
      <TransactionTopBar />
      <article className="flex flex-1">{children}</article>
    </section>
  );
};

export default layout;
