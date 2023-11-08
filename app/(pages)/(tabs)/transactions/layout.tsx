import React from "react";

// UI
import TransactionTopBar from "@/components/pages/transaction/topbar";
import { Toaster } from "@/components/ui/toaster";
import { TabProvider } from "@/components/pages/transaction/tabcontext";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TabProvider>
      <section className="flex flex-col flex-1 w-full h-full bg-slate-100">
        <Toaster />
        <TransactionTopBar />
        <article className="flex flex-1">{children}</article>
      </section>
    </TabProvider>
  );
};

export default layout;
