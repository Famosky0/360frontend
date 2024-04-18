import React, { useState, useEffect } from "react";
import { bookingSchema } from "../Interface";
import { calculateAmount } from "@/services/request";
import Loader from "@/Loader/Loader";

const BookingProcessOne = ({
  setBookingInfo,
  bookingInfo,
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Clear location if shoot type is indoor
    if (name === "shoot_type" && value === "indoor") {
      setBookingInfo({ ...bookingInfo, location: "", [name]: value });
    } else {
      setBookingInfo({ ...bookingInfo, [name]: value });
    }
  };

  const [loading, setLoading] = useState(false);

  const calculateShootAmount = async () => {
    setLoading(true);
    try {
      const data = await calculateAmount({
        number_of_shoot: bookingInfo.number_of_shoot,
      });
      if (data && data.price) {
        setBookingInfo({ ...bookingInfo, amount: data.price });
      }
    } catch (error) {
      console.error('Failed to calculate amount:', error);
    }
    setLoading(false);
  };

  // Reset amount whenever the number of shoots changes
  useEffect(() => {
    setBookingInfo(prev => ({ ...prev, amount: "" }));
  }, [bookingInfo.number_of_shoot, setBookingInfo]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl text-primary">Create Bookings</h1>
      </div>

      <form className="flex flex-col gap-5 mt-8">
        <div className="flex flex-col gap-1">
          <label htmlFor="shoot_type">Shoot Type</label>
          <select
            name="shoot_type"
            id="shoot_type"
            value={bookingInfo.shoot_type}
            onChange={handleChange}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          >
            <option value="OUTDOOR">OUTDOOR</option>
            <option value="INDOOR">INDOOR</option>
          </select>
        </div>
        <div>
          <label htmlFor="no_of_shoot">Number of Shoot</label>
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

        <div className="w-full flex items-center gap-[10px]">
          <label htmlFor="amount">Amount</label>
          <button
            type="button"
            onClick={calculateShootAmount}
            disabled={bookingInfo.number_of_shoot <= 0 || loading}
            className="bg-primary text-white px-2 py-1 rounded-md"
          >
            {loading ? <Loader /> : "Calculate"}
          </button>
        </div>
        <input
          type="text"
          id="amount"
          name="amount"
          value={bookingInfo.amount || ''}
          disabled
          placeholder="Amount will be displayed here"
          className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
        />

        {bookingInfo.shoot_type.toLowerCase() === "outdoor" && (
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={bookingInfo.location}
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
