import React from "react";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import PhotographCTX from "@/components/CTX";
import Portfolio from "@/components/Portfolio";
import Section from "@/components/Section";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FrequentlyAskedQuestions from "@/components/FAQ";

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-12">
      <Navbar />
      <HeroSection />
      <Section />
      <PhotographCTX />
      <Portfolio />
      <Pricing />
      <Testimonials />
      <FrequentlyAskedQuestions />
      <Footer />
    </main>
  );
}
