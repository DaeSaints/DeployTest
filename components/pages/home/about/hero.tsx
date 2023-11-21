import React from "react";
import Header from "../header";
import { Button } from "@/components/ui/button";

const AboutHero = () => {
  return (
    <section className="h-[calc(100vh-80px)] bg-white flex flex-col items-center py-10 justify-between relative px-24 gap-10">
      <Header
        heading={"Unlock Their Potential"}
        subheading={
          "Welcome to Umonics, where learning is fun and engaging for young minds."
        }
        variant="small"
      />
      <div className="grid w-full h-full grid-cols-7 grid-rows-1 gap-10">
        <div className="relative w-full h-full col-span-4 overflow-hidden shadow bg-main-300 rounded-xl"></div>
        <div className="flex flex-col items-start justify-center w-full h-full col-span-3 gap-4">
          <span className="font-semibold text-dark-1">Empowering</span>
          <h3 className="text-3xl font-bold text-main-500">
            Unlocking Potential Through Engaging Early Education
          </h3>
          <p className="text-sm text-dark-1">
            The Umonics Method is a memory enrichment training program for
            preschoolers. The method teaches preschoolers how to memorise and
            recall information with ease. <br /><br />
            Memory is a crucial skill to develop at a young age as, without the
            ability to retain information effectively, knowledge cannot be
            retained. We believe that memory training should be taught to
            preschoolers at a young age, just like how we teach them to write
            and read.
          </p>
          <Button type="button">Sign Up</Button>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
