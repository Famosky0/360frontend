"use client";
import React, { useState } from "react";

const BookingProcessOne = ({ profile }) => {
  const [bookingInfo, setBookingInfo] = useState({
    phone: "",
    shooting_date: "",
    shooting_time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-3xl text-primary">Create Bookings</h1>

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
          <label htmlFor="Phone_number">WhatssApp Number</label>
          <input
            type="tel"
            id="Phone_number"
            name="phone"
            value={bookingInfo["phone"]}
            onChange={handleChange}
            placeholder="08036399878"
            pattern="^\d{11}$"
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="password">Date</label>
          <input
            type="date"
            id="date"
            name="shooting_date"
            value={bookingInfo["shooting_date"]}
            onChange={handleChange}
            placeholder={new Date().toISOString().split('T')[0]}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="time">Time (when are you shooting?)</label>
          <input
            type="time"
            id="time"
            name="shooting_time"
            value={bookingInfo["shooting_time"]}
            onChange={handleChange}
            placeholder="HH:MM"
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
      </form>
    </div>
  );
};

export default BookingProcessOne;
