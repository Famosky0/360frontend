import React from "react";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import FrequentlyAskedQuestions from "@/components/FAQ";

const Gallery = () => {  
  return (
    <main className="w-full flex flex-col gap-12">
      <Navbar />
      <Portfolio />
      <Pricing />
      <FrequentlyAskedQuestions />
      <Footer />
    </main>
  );
};

export default Gallery;
