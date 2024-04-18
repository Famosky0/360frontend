import React from "react";
import { bookingSchema } from "../Interface";

const BookingProcessTwo = ({ setBookingInfo, bookingInfo }: { setBookingInfo: React.Dispatch<React.SetStateAction<bookingSchema>>; bookingInfo: bookingSchema; }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl text-primary">Create Bookings</h1>
      </div>
    </div>
  );
};

export default BookingProcessTwo;
