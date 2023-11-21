import React from "react";

const AboutRecognized = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full gap-10 px-24 py-10 bg-main-500">
      <div className="font-bold text-white">
        Recognized by top educational institutions for excellence in early
        childhood education
      </div>
      <div className="grid w-full grid-cols-2 grid-rows-1 gap-4">
        <div className="flex items-center justify-center w-full h-24 border-2 border-white rounded-lg">
          <span className="text-xl font-bold text-center text-white">
            Early Childhood Development Agency
          </span>
        </div>
        <div className="flex items-center justify-center w-full h-24 border-2 border-white rounded-lg">
          <span className="text-xl font-bold text-center text-white">
            Ministry of Education Singapore
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutRecognized;
