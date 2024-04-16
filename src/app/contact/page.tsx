import React from "react";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import ContactUsComponent from "@/components/Contact";

const ContactUs = () => {
  return (
    <main className="w-full flex flex-col gap-12">
      <Navbar />
      <ContactUsComponent />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
};

export default ContactUs;
