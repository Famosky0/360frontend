import React from "react";

// Components
import WhiteSpace from "@/components/WhiteSpace";
import SocialHandles from "@/components/SocialHandles";

const Footer = () => {
  return (
    <div className="py-12">
      <WhiteSpace>
        <div className="w-full text-center flex flex-col gap-6 max-w-3xl mx-auto">
          <h4 className="text-xl font-normal capitalize text-primary">
            2024, By 360 Shotitz
          </h4>
          <div className="w-full flex justify-center items-center">
            <SocialHandles />
          </div>
        </div>
      </WhiteSpace>
    </div>
  );
};

export default Footer;
