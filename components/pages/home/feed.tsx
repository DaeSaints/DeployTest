import React from "react";

const FeedSection = () => {
  return (
    <section className="flex flex-col w-full px-24 py-20 bg-white">
      <div className="max-w-2xl text-6xl font-extrabold text-left text-main-500">
        See what our Students can do!
      </div>
      <p className="mt-2 font-medium">
        We are the first preschool provider with a curriculum that teach memory
        techniques
      </p>
      <div className="grid w-full grid-flow-row grid-cols-4 mt-10">
        <div className="relative col-span-2">
          <div className="rounded-2xl w-[25rem] h-96 bg-main-300 shadow"></div>
        </div>
        <div className="grid grid-cols-2 col-span-2 grid-rows-1">
          <div className="col-span-1" />
          <div className="col-span-1">
            <div className="relative flex flex-col col-span-1 gap-28">
              <p className="font-medium text-left">
                A child’s brain development happens before the age of 6. Hence,
                early childhood education is the key to a flying start for every
                child.
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="relative w-20 h-20 overflow-hidden rounded-full bg-main-500"></div>
                  <span className="text-sm text-center">
                    Improved social skills
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="relative w-20 h-20 overflow-hidden rounded-full bg-main-500"></div>
                  <span className="text-sm text-center">
                    Better language development
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="relative w-20 h-20 overflow-hidden rounded-full bg-main-500"></div>
                  <span className="text-sm text-center">Brighter future</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end col-span-2 gap-6 text-center">
          <div className="text-4xl font-extrabold text-main-500">
            Learning Benefits
          </div>
          <div className="grid grid-flow-row grid-cols-2 gap-4">
            <div className="flex items-center justify-center col-span-1 gap-4">
              <div className="w-16 h-16 rounded-full bg-main-300"></div>
              <div className="flex flex-col items-start justify-center flex-1">
                <span className="text-lg font-medium">Personalized</span>
                <p className="text-left">Develop Confidence!</p>
              </div>
            </div>
            <div className="flex items-center justify-center col-span-1 gap-4">
              <div className="w-16 h-16 rounded-full bg-main-300"></div>
              <div className="flex flex-col items-start justify-center flex-1">
                <span className="text-lg font-medium">Proven</span>
                <p className="text-left">Develop good memory skills!</p>
              </div>
            </div>
            <div className="flex items-center justify-center col-span-1 gap-4">
              <div className="w-16 h-16 rounded-full bg-main-300"></div>
              <div className="flex flex-col items-start justify-center flex-1">
                <span className="text-lg font-medium">"I Did It" Moment</span>
                <p className="text-left">
                  Learn Information a much quicker pace!
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center col-span-1 gap-4">
              <div className="w-16 h-16 rounded-full bg-main-300"></div>
              <div className="flex flex-col items-start justify-center flex-1">
                <span className="text-lg font-medium">Joyful</span>
                <p className="text-left">Build essential life skills!</p>
              </div>
            </div>
            <div className="flex items-center justify-center col-span-1 gap-4">
              <div className="w-16 h-16 rounded-full bg-main-300"></div>
              <div className="flex flex-col items-start justify-center flex-1">
                <span className="text-lg font-medium">Safe & Easy</span>
                <p className="text-left">
                  Memorize and recall information with ease!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end col-span-2">
          <div className="rounded-2xl w-[32rem] aspect-square bg-main-300 shadow"></div>
        </div>
      </div>
    </section>
  );
};

export default FeedSection;
