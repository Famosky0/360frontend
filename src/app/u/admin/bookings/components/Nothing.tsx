import React from "react";
import Image from "next/image";

// Image
import NothingFound from "../../../../../../public/nothing.png";

const RecentBookingsEmptyState = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 text-center items-center justify-center mx-auto">
      <Image
        src={NothingFound}
        alt="Nothing found"
        className="flex align-middle"
      />
      <h1 className="text-xl font-semibold animate-pulse">
        Nothing&apos;s Found
      </h1>
    </div>
  );
};

export default RecentBookingsEmptyState;
