import React from "react";

const ClientsSection = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full gap-8 px-24 py-16 bg-dark-1">
      <div className="flex items-center justify-between w-full">
        <div className="text-6xl font-bold uppercase text-main-500">
          trusted
        </div>
        <p className="max-w-sm text-right text-white">
          By top educational institutions and organizations worldwide
        </p>
      </div>
      <div className="flex items-center justify-start w-full gap-12 text-lg font-medium text-white">
        <div className="flex items-center justify-center gap-4">
          <div className="rounded-lg w-14 h-14 bg-main-300"></div>
          <span className="">Webflow</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="rounded-lg w-14 h-14 bg-main-300"></div>
          <span className="">Figma</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="rounded-lg w-14 h-14 bg-main-300"></div>
          <span className="">Relume</span>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
