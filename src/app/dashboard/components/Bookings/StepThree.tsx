"use client";

import React, { useState, useEffect } from "react";
import { bookingSchema } from "../Interface";
import { calculateAmount } from "@/services/request";
import Loader from "@/Loader/Loader";

const BookingProcessOne = ({
  setBookingInfo,
  bookingInfo,
}: {
  setBookingInfo: React.Dispatch<React.SetStateAction<bookingSchema>>;
  bookingInfo: bookingSchema;
}) => {
  const handleChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    setBookingInfo({ ...bookingInfo, [name]: value });
  };

  const [loading, setLoading] = useState(false);

  const calculateShootAmount = async () => {
    if (bookingInfo.number_of_shoot > 0) { // Ensure that calculation is relevant
      const accessToken = localStorage.getItem("accessToken") || "defaultAccessToken";
      setLoading(true);
      try {
        const data = await calculateAmount(accessToken, {
          number_of_shoot: bookingInfo["number_of_shoot"],
        });
        setBookingInfo({ ...bookingInfo, amount: data.price });
      } catch (error) {
        console.error("Failed to calculate amount:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    calculateShootAmount(); // Call calculation when number_of_shoot changes
  }, [bookingInfo.number_of_shoot]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl text-primary">Create Bookings</h1>
      </div>

      <form className="flex flex-col gap-5 mt-8">
        <div className="flex flex-col gap-1">
          <label htmlFor="full_name">Shoot Type</label>
          <select
            name="shoot_type"
            id="shoot_type"
            value={bookingInfo["shoot_type"]}
            onChange={handleChange}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          >
            <option>OUTDOOR</option>
            <option>INDOOR</option>
          </select>
        </div>
        <div>
          <label htmlFor="Phone_number">Number of Shoot</label>
          <input
            type="number"
            id="no_of_shoot"
            name="number_of_shoot"
            value={bookingInfo.number_of_shoot}
            onChange={handleChange}
            placeholder="e.g., 20"
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>

        <div>
          <div className="w-full flex items-center gap-[10px]">
            <label htmlFor="Phone_number">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={bookingInfo["amount"] || 'Calculating...'}
              disabled
              className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
            />
            {loading && <Loader />}
          </div>
        </div>
        
        {bookingInfo["shoot_type"].toLowerCase() === "outdoor" && (
          <div>
            <label htmlFor="password">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={bookingInfo["location"]}
              onChange={handleChange}
              placeholder="e.g., Lagos"
              className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingProcessOne;
