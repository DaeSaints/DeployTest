import React from "react";

const AboutParentsLoveSection = () => {
  return (
    <section className="flex flex-col w-full gap-12 px-24 py-10 bg-dark-1">
      <div className="flex items-center justify-between w-full">
        <div className="max-w-lg text-5xl font-extrabold uppercase text-main-500">
          Why Parents Love Umonics Method
        </div>
        <p className="max-w-xs text-lg font-bold text-right text-white uppercase">
          <span className="text-main-500">memory</span> enrichment training
          program for preschoolers
        </p>
      </div>

      <div className="grid grid-cols-1 grid-rows-2 gap-4 py-24 -rotate-6">
        <div className="flex items-center justify-start gap-12">
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-20 border-2 shadow border-dark-2/80 rounded-2xl bg-main-300"></div>
            <span className="max-w-[12rem] text-xl text-white font-semibold capitalize">
              12 sessions per term of 3 months
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-20 border-2 shadow border-dark-2/80 rounded-2xl bg-main-300"></div>
            <span className="max-w-[12rem] text-xl text-white font-semibold capitalize">
              Each session lasts 30-45 minutes.
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-20 border-2 shadow border-dark-2/80 rounded-2xl bg-main-300"></div>
            <span className="max-w-[12rem] text-xl text-white font-semibold capitalize">
              Can see results in as fast as six sessions
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-20 border-2 shadow border-dark-2/80 rounded-2xl bg-main-300"></div>
            <span className="max-w-[12rem] text-xl text-white font-semibold capitalize">
              Open for students from ages 3 to 6 years old
            </span>
          </div>
        </div>
        <div className="flex items-center justify-start gap-12">
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-20 border-2 shadow border-dark-2/80 rounded-2xl bg-main-300"></div>
            <span className="max-w-[12rem] text-xl text-white font-semibold capitalize">
              Weekend Classes
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-20 border-2 shadow border-dark-2/80 rounded-2xl bg-main-300"></div>
            <span className="max-w-[12rem] text-xl text-white font-semibold capitalize">
              Communicate easily with teachers
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-20 border-2 shadow border-dark-2/80 rounded-2xl bg-main-300"></div>
            <span className="max-w-[12rem] text-xl text-white font-semibold capitalize">
              Lessons are personalized
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-20 border-2 shadow border-dark-2/80 rounded-2xl bg-main-300"></div>
            <span className="max-w-[12rem] text-xl text-white font-semibold capitalize">
              Ease of Use
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutParentsLoveSection;
