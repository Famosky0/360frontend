"use client";

import React, { useState, useEffect } from "react";
import { bookingSchema, profileSchema } from "../Interface";
import { retrievePlans, createBooking } from "@/services/request";

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
  const [plans, setPlans] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch plans when component mounts
    const fetchPlans = async () => {
      const fetchedPlans = await retrievePlans();
      setPlans(fetchedPlans);
      setBookingInfo(info => ({ ...info, plan: 'JASPER' })); // Default to 'JASPER' plan
    };
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const pattern = /^\+234\d{10}$/;
      if (!pattern.test(value)) {
        setErrorMessage("Invalid WhatsApp number. Must match +234 followed by 10 digits.");
      } else {
        setErrorMessage("");
      }
    }
    setBookingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createBooking(bookingInfo);
      alert('Booking created successfully!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to create booking. Please check your input.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl text-primary">Create Bookings</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
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
          <label htmlFor="Phone_number">Your Whatsapp Number</label>
          <input
            type="tel"
            id="Phone_number"
            name="phone"
            value={bookingInfo["phone"]}
            onChange={handleChange}
            placeholder="+2348149055068"
            pattern="^\+234\d{10}$"
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

        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">
          {loading ? 'Creating Booking...' : 'Create Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingProcessOne;
