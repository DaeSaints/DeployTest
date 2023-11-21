import ClientsSection from "@/components/pages/home/clients";
import CTA_ONE from "@/components/pages/home/cta-1";
import FeatureSection from "@/components/pages/home/feature";
import FeedSection from "@/components/pages/home/feed";
import HeroSection from "@/components/pages/home/hero";
import HowItWorksSection from "@/components/pages/home/how-it-works";
import PersonalizationSection from "@/components/pages/home/personalization";
import PricingSection from "@/components/pages/home/pricing";
import TestimonialSection from "@/components/pages/home/testimonial";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <FeedSection />
      <PersonalizationSection />
      <TestimonialSection />
      <PricingSection />
      <ClientsSection />
      <CTA_ONE />
    </>
  );
}
