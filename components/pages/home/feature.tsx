import React from "react";

const FeatureSection = () => {
  return (
    <section className="flex flex-col items-center justify-start w-full gap-24 px-12 pt-64 py-28 bg-dark-1">
      <div className="flex flex-col items-center w-full text-center">
        <span className="text-xl font-bold text-main-500">
          Discover the Umonics Advantage
        </span>
        <p className="max-w-2xl mt-8 text-4xl font-semibold leading-[3rem] text-white">
          Discover a unique approach to early childhood education that nurtures
          growth and development.
        </p>
      </div>
      <div className="grid w-full grid-cols-3 grid-rows-1">
        <div className="flex flex-col items-center w-full text-center">
          <span className="text-xl font-bold text-main-500">
            Interactive and Fun Classes
          </span>
          <p className="max-w-sm mt-4 text-base font-semibold text-white">
            Discover a unique approach to early childhood education that
            nurtures growth and development.
          </p>
        </div>
        <div className="flex flex-col items-center w-full text-center">
          <span className="text-xl font-bold text-main-500">
            Parental Involvement
          </span>
          <p className="max-w-sm mt-4 text-base font-semibold text-white">
            Umonics believes in the power of collaboration between parents and
            educators.
          </p>
        </div>
        <div className="flex flex-col items-center w-full text-center">
          <span className="text-xl font-bold text-main-500">Chat System</span>
          <p className="max-w-sm mt-4 text-base font-semibold text-white">
            Umonics believes communication is key to a well organized learning
            platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
