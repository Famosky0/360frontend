"use client";

import React, { useEffect, useState } from "react";
import { bookingSchema, profileSchema } from "../Interface";
import { retrieveProfile } from "@/services/request";

const BookingProcessOne = ({
  setBookingInfo,
  bookingInfo,
  profile,
  setProfile,
}: {
  setBookingInfo: React.Dispatch<React.SetStateAction<bookingSchema>>;
  bookingInfo: bookingSchema;
  profile: profileSchema;
  setProfile: React.Dispatch<React.SetStateAction<profileSchema>>;
}) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "shooting_date" && new Date(value) < new Date()) {
      alert("Please select a valid date in the future.");
      return;
    }
    if (name === "shooting_time" && (value < "08:00" || value > "23:00")) {
      alert("Please select a time between 08:00 and 23:00.");
      return;
    }
    setBookingInfo({ ...bookingInfo, [name]: value });
  };

  const getUserProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const data = await retrieveProfile(accessToken);
      if (data) {
        setProfile(data);
      }
    }
  };

  useEffect(() => {
    getUserProfile();
    // Set default plan as JASPER
    setBookingInfo(prev => ({ ...prev, plan: "JASPER" }));
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl text-primary">Create Bookings</h1>
      </div>

      <form className="flex flex-col gap-5 mt-8">
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
        <div>
          <label htmlFor="Phone_number">WhatsApp Number</label>
          <input
            type="tel"
            id="Phone_number"
            name="phone"
            value={bookingInfo["phone"]}
            onChange={handleChange}
            pattern="^0\d{10}$"
            placeholder="08036399878"
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="plan">Plan</label>
          <select
            id="plan"
            name="plan"
            value={bookingInfo["plan"]}
            onChange={handleChange}
            disabled // This will grey out the select box
            className="w-full bg-gray-200 rounded-md min-h-12 mt-1.5 p-2 text-black cursor-not-allowed"
          >
            <option value="JASPER">JASPER</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="shooting_date"
            value={bookingInfo["shooting_date"]}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="time">Time (When are you coming for your shoot)</label>
          <input
            type="time"
            id="time"
            name="shooting_time"
            value={bookingInfo["shooting_time"]}
            onChange={handleChange}
            min="08:00"
            max="23:00"
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
      </form>
    </div>
  );
};

export default BookingProcessOne;
