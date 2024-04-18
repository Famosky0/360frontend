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
  // Ensure initial state includes all required properties as per bookingSchema
  const [bookingDetails, setBookingDetails] = useState<bookingSchema>({
    phone: '',
    plan: 'JASPER',  // Default plan set to JASPER and included in the initial state
    shoot_type: '',
    location: '',
    number_of_shoot: 0,
    amount: '',
    shooting_date: '',
    shooting_time: ''
  });

  const handleChange = (e: any) => {
    let { name, value } = e.target;
    if (name === "phone" && !/^\d{11}$/.test(value)) { // Validates Nigerian mobile numbers without country code
      alert("Invalid phone number. Enter an 11-digit phone number.");
      return;
    }
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const getUserProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const data = await retrieveProfile(accessToken);
      if (data) {
        setProfile(data);
      }
    } else {
      const data = await retrieveProfile("string");
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
            value={bookingDetails.phone}
            onChange={handleChange}
            placeholder="08036399878"
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="plan">Plan</label>
          <select
            id="plan"
            name="plan"
            value={bookingDetails.plan}
            onChange={handleChange}
            disabled
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
            value={bookingDetails.shooting_date}
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
            value={bookingDetails.shooting_time}
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
