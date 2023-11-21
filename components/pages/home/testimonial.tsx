"use client";
import React, { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    comment: `My daughter has been enjoying her classes at Umonics and benefited from the curriculum.`,
    parent: "Ben",
  },
  {
    comment: `Umonics has given our child an avenue to realize her full potential. Not only has she developed a keen interest in many things not expected of a child her age, but the methods in which she learns ensure that she also remembers the information in an interesting way which helps her recall it easily. information. Umonics has certainly helped build her confidence as well as her curiosity for learning new things.`,
    parent: "Minal Mohite",
  },
  {
    comment: `My son has been with Umonics for almost 1 year and he seems to be applying the techniques into his daily life. One day, I was randomly telling him my 
    mobile number and he managed to recite it out the next time I asked him! I was pleasantly surprised. He enjoys going to class a lot and he always talks about his teachers so I guess he’s enjoying the class very much as well! Thank you to the Umonics team for your time and effort, really appreciate it!`,
    parent: "Kenken Lim",
  },
  {
    comment: `My daughter 3.5 years old is very happy with her Umonics class ! She can not wait to go there ! The teachers are really professionnal, lovely, and help the kids to learn with joy ! My daughter will continue for sure until it will be open :)`,
    parent: "Assia Fernandez",
  },
];

const TestimonialSection = () => {
  const [displayed, setDisplayed] = useState(0);
  return (
    <section className="flex flex-col w-full py-20 bg-white">
      <div className="max-w-[56rem] mx-auto text-4xl font-bold text-center text-main-500">
        Over <span className="underline text-dark-1">10,000</span> Satisfied Students
        Worldwide! Help Your Child Excel in School & Life Today
      </div>
      <div className="relative w-full overflow-hidden">
        <Button
          onClick={() => {
            let newDisplay = TESTIMONIALS.length - 1;
            if (displayed > 0) newDisplay = displayed - 1;
            setDisplayed(newDisplay);
          }}
          variant={"ghost"}
          className="absolute w-16 h-16 p-4 -translate-y-1/2 rounded-full left-10 top-1/2"
        >
          <ChevronLeft className="w-full h-full" />
        </Button>
        <Button
          onClick={() => {
            let newDisplay = 0;
            if (displayed < TESTIMONIALS.length - 1) newDisplay = displayed + 1;
            setDisplayed(newDisplay);
          }}
          variant={"ghost"}
          className="absolute w-16 h-16 p-4 -translate-y-1/2 rounded-full right-10 top-1/2"
        >
          <ChevronRight className="w-full h-full" />
        </Button>
        <div className="w-full p-8 mx-auto transition bg-white">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center ml-2">
              <span className="mr-2 text-lg font-semibold text-main-500">
                {TESTIMONIALS[displayed].parent}
              </span>
              <span className="text-xl font-light text-gray-400">/</span>
              <span className="ml-2 text-gray-400 text-md">Parent</span>
            </div>
          </div>
          <p className="w-full m-auto text-lg text-center text-gray-600 md:w-2/3 md:text-3xl">
            <span className="font-bold text-main-500">“</span>
            {TESTIMONIALS[displayed].comment}
            <span className="font-bold text-main-500">”</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
