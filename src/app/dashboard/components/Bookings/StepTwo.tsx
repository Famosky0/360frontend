import React from "react";
import { bookingSchema } from "../Interface";

const BookingProcessTwo = ({
  setBookingInfo,
  bookingInfo,
}: {
  setBookingInfo: React.Dispatch<React.SetStateAction<bookingSchema>>;
  bookingInfo: bookingSchema;
}) => {
  // Assuming the Pricing component calculates and updates the booking info with the price
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl text-primary">Review and Confirm Booking</h1>
      </div>

      {/* Display booking summary and calculated price */}
      <div className="flex flex-col gap-2 p-4 border border-gray-300 rounded-md">
        <h2 className="text-2xl">Booking Summary:</h2>
        <p><strong>Type of Shoot:</strong> {bookingInfo.shoot_type}</p>
        <p><strong>Number of Shoots:</strong> {bookingInfo.number_of_shoot}</p>
        <p><strong>Date:</strong> {bookingInfo.shooting_date}</p>
        <p><strong>Time:</strong> {bookingInfo.shooting_time}</p>
        <p><strong>Location:</strong> {bookingInfo.location}</p>
        <p><strong>Estimated Price:</strong> ${bookingInfo.amount}</p>
        {/* If you have conditional rendering for indoor/outdoor specific information, include it here */}
      </div>

      {/* Buttons to go back or proceed to payment */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setBookingInfo((prev) => ({ ...prev, step: 1 }))}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Edit Details
        </button>
        <button
          onClick={() => setBookingInfo((prev) => ({ ...prev, step: 3 }))}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BookingProcessTwo;
