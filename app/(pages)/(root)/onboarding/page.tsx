import OnboardingComponent from "@/components/pages/onboarding/onboarding-component";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const page = () => {
  return (
    <section className="flex flex-1 w-full h-full px-6 py-4 pl-10 bg-white">
      <Toaster />
      <article className="flex-[3] flex flex-col">
        <header className="flex items-center justify-start w-full gap-1">
          <div className="w-8 h-8 rounded-full bg-main-400" />
          <span className="text-2xl font-semibold text-main-400">Umonics</span>
        </header>
        <main className="flex flex-col flex-1 py-4 pr-4">
          <OnboardingComponent />
        </main>
      </article>
      <article className="flex-1 border shadow rounded-2xl bg-gradient-to-t from-main-500 via-blue-200 to-teal-200 border-slate-200"></article>
    </section>
  );
};

export default page;
