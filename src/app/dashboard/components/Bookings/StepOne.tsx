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
  const [plans, setPlans] = useState([{ name: "JASPER", price: 500 }]); // Mocked plans data

  const handleChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;

    // Update state based on input changes
    setBookingInfo({ ...bookingInfo, [name]: value });

    // Additional logic for dynamic pricing if plan is JASPER
    if (name === "plan" && value === "JASPER") {
      const pricePerShoot = 500; // This should come from settings or be dynamically fetched
      setBookingInfo((prev) => ({
        ...prev,
        price: prev.number_of_shoot * pricePerShoot
      }));
    }
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
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl text-primary">Create Bookings</h1>
      </div>

      <form className="flex flex-col gap-5 mt-8">
        <div>
          <label htmlFor="plan">Plan</label>
          <select
            id="plan"
            name="plan"
            value={bookingInfo.plan}
            onChange={handleChange}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          >
            {plans.map((option) => (
              <option key={option.name} value={option.name}>{option.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="number_of_shoot">Number of Shoot</label>
          <input
            type="number"
            id="number_of_shoot"
            name="number_of_shoot"
            value={bookingInfo["number_of_shoot"]}
            onChange={handleChange}
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
            placeholder="08036399878"
            pattern="^0\d{10}$"
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
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
