import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col flex-1 w-full h-full py-2 bg-white">
      <header className="flex items-center justify-between w-full h-24 px-6 pt-4 pb-6 border-b shadow">
        <h1 className="text-2xl font-bold text-main-700">Courses Manager</h1>
      </header>
      {children}
    </section>
  );
};

export default layout;
