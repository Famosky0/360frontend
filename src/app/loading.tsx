import React from "react";
import Image from "next/image";

// Shotitz Logo
import ShotitzLogo from "../../public/brand/logo.jpeg";

const LoadingPage = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-black min-h-[100dvh] flex justify-center items-center">
      <div className="animate-pulse">
        <Image
          src={ShotitzLogo}
          priority={true}
          alt="scanr logo"
          className="w-[200px] object-cover -ml-6"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
