import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col flex-1 w-full h-full pb-2 bg-slate-200">
      <header className="flex items-center justify-between w-full h-24 px-6 py-6 bg-white border-b shadow">
        <h1 className="text-2xl font-bold text-main-700">Courses Manager</h1>
      </header>
      {children}
    </section>
  );
};

export default layout;
