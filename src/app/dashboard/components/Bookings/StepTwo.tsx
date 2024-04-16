import React from "react";
import { bookingSchema } from "../Interface";
import Pricing from "./Pricing";

const BookingProcessTwo = ({
  setBookingInfo,
  bookingInfo,
  pricingPlan,
}: {
  setBookingInfo: React.Dispatch<React.SetStateAction<bookingSchema>>;
  bookingInfo: bookingSchema;
  pricingPlan: any;
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl text-primary">Create Bookings</h1>
      </div>

      <div>
        <Pricing setBookingInfo={setBookingInfo} bookingInfo={bookingInfo} pricingPlan={pricingPlan} />
      </div>
    </div>
  );
};

export default BookingProcessTwo;
