import React from "react";

const AboutVideoSection = () => {
  return (
    <section className="h-[calc(100vh-80px)] p-8 bg-white flex justify-center items-center">
      <div className="grid w-full h-full grid-cols-3 grid-rows-3 gap-8">
        <div className="flex items-center justify-center w-full h-full border-2 shadow border-main-500 rounded-xl">
          <div className="p-20 text-xl font-bold text-left text-main-500">
            We are the first preschool provider with a curriculum that teach
            memory techniques
          </div>
        </div>
        <div className="w-full h-full shadow bg-main-500 rounded-xl"></div>
        <div className="w-full h-full shadow bg-dark-2 rounded-xl"></div>
        <div className="w-full h-full bg-pink-500 shadow rounded-xl"></div>
        <div className="w-full h-full col-span-2 row-span-2 shadow bg-main-300 rounded-xl"></div>
        <div className="w-full h-full bg-orange-500 shadow rounded-xl"></div>
      </div>
    </section>
  );
};

export default AboutVideoSection;
