import AboutHero from "@/components/pages/home/about/hero";
import AboutParentsLoveSection from "@/components/pages/home/about/parents-love";
import AboutRecognized from "@/components/pages/home/about/recognized";
import AboutVideoSection from "@/components/pages/home/about/vids";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <AboutRecognized />
      <AboutParentsLoveSection />
      <AboutVideoSection />
    </>
  );
};

export default AboutPage;
