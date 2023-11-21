import React from "react";

const PersonalizationSection = () => {
  return (
    <section className="grid w-full grid-cols-3 grid-rows-1 h-[32rem]">
      <div className="flex flex-col w-full p-10 bg-dark-1">
        <div className="text-4xl font-bold leading-normal text-left text-white">
          We combine your child’s unique interests
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-col w-full p-10 bg-main-500">
        <div className="flex-1"></div>
        <div className="text-4xl font-bold leading-normal text-left text-white">
          With the use of their age and current learning level
        </div>
      </div>
      <div className="flex flex-col w-full p-10 bg-main-300">
        <div className="text-4xl font-bold leading-normal text-left text-white">
          We'll create a personalized learning journey they will love
        </div>
        <div className="flex-1"></div>
      </div>
    </section>
  );
};

export default PersonalizationSection;
