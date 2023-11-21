import React from "react";

const HowItWorksSection = () => {
  return (
    <section className="flex flex-col w-full gap-10 px-24 py-20 bg-white">
      <div className="flex flex-col">
        <div className="text-5xl font-bold text-main-500">How It Works?</div>
        <p className="max-w-2xl mt-4 text-left">
          Our program offers Unique Academic & World General Knowledge themes,
          building their skills through lessons and activities they love.
        </p>
      </div>
      <div className="grid w-full grid-cols-4 grid-rows-1 gap-8">
        <div className="flex flex-col w-full">
          <div className="w-full h-32"></div>
          <div className="flex flex-col items-center justify-center w-full">
            <span className="text-xl font-bold text-main-500 w-[20rem]">
              Partnering Up With Early Childhood Experts
            </span>
            <p className="max-w-2xl mt-2 text-base w-[20rem] text-black">
              Sancy then partnered up with early childhood educators and
              developers to write a curriculum specifically for preschoolers
              from Nursery 1 to Kindergarten
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full h-32"></div>
          <div className="flex flex-col items-center justify-center w-full">
            <span className="text-xl font-bold text-main-500 w-[20rem]">
              Founder of The Umonics Method​
            </span>
            <p className="max-w-2xl mt-2 text-base w-[20rem] text-black">
              The Umonics Method was founded by memory athlete, Sancy Suraj with
              the goal of teaching preschoolers memory techniques.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full h-32"></div>
          <div className="flex flex-col items-center justify-center w-full">
            <span className="text-xl font-bold text-main-500 w-[20rem]">
              Student App​
            </span>
            <p className="max-w-2xl mt-2 text-base w-[20rem] text-black">
              Easy access to enrolled classes. Pursue classes, join ZOOM
              meetings.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full h-32"></div>
          <div className="flex flex-col items-center justify-center w-full">
            <span className="text-xl font-bold text-main-500 w-[20rem]">
              The Curriculum​
            </span>
            <p className="max-w-2xl mt-2 text-base w-[20rem] text-black">
              The Umonics Method curriculum was developed in line with
              Singapore’s Early Childhood Development Agency (ECDA) Framework.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
