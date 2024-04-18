"use client";

import React, { useState } from "react";
import { bookingSchema, profileSchema } from "../Interface";

const BookingProcessOne = ({
  setBookingInfo,
  bookingInfo,
  profile,
}: {
  setBookingInfo: React.Dispatch<React.SetStateAction<bookingSchema>>;
  bookingInfo: bookingSchema;
  profile: profileSchema;
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Reset error message on input change
    setErrorMessage("");

    if (name === "phone") {
      const pattern = /^\d{11}$/; // Matches 11 digits
      if (!pattern.test(value)) {
        setErrorMessage("Invalid WhatsApp number. Enter an 11-digit phone number without spaces or codes.");
      }
    }

    setBookingInfo({ ...bookingInfo, [name]: value });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl text-primary">Create Bookings</h1>
      </div>

      <form className="flex flex-col gap-5 mt-8">
        {/* Full Name */}
        <div>
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={profile.first_name + " " + profile.last_name}
            disabled
            placeholder="Enter your Full Name"
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="Phone_number">Your WhatsApp Number</label>
          <input
            type="tel"
            id="Phone_number"
            name="phone"
            value={bookingInfo["phone"]}
            onChange={handleChange}
            placeholder="08036300284"
            pattern="^\d{11}$"
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
          {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
        </div>

        {/* Shooting Date */}
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="shooting_date"
            value={bookingInfo["shooting_date"]}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]} // Disallow past dates
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>

        {/* Shooting Time */}
        <div>
          <label htmlFor="time">Time (When are you coming for your shoot)</label>
          <input
            type="time"
            id="time"
            name="shooting_time"
            value={bookingInfo["shooting_time"]}
            onChange={handleChange}
            min="08:00"
            max="23:00" // Ensure time is within operational hours
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>

        {/* Plan Selection - Disabled and set to JASPER */}
        <div>
          <label htmlFor="plan">Plan</label>
          <select
            id="plan"
            name="plan"
            value="JASPER" // Set to JASPER by default
            onChange={handleChange}
            disabled={true} // Disable selection
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black opacity-50 cursor-not-allowed"
          >
            <option value="JASPER">JASPER</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default BookingProcessOne;
