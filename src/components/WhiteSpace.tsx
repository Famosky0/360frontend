import React from "react";

const WhiteSpace = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full md:max-w-[1200px] max-w-[90%] mx-auto">
      {children}
    </div>
  );
};

export default WhiteSpace;
