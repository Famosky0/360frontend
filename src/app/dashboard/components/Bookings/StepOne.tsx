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
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  const handleChange = (e: any) => {
    let { name, value } = e.target;

    // Reset error message
    if (name === "phone") {
      const pattern = /^\+234\d{10}$/; // Example: +234 followed by 10 digits
      if (!pattern.test(value)) {
        setErrorMessage("Invalid WhatsApp number. Must match +234 followed by 10 digits.");
      } else {
        setErrorMessage(""); // Clear error message if pattern matches
      }
    }

    setBookingInfo({ ...bookingInfo, [name]: value });
  };

  const getUserProfile = async () => {
    let data = [];
    const accessToken = localStorage.getItem("accessToken");
    console.log("token: " + accessToken);
    if (accessToken) {
      data = await retrieveProfile(accessToken);
      console.log(data);
      if (data) {
        setProfile(data);
      }
    } else {
      data = await retrieveProfile("string");
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

        <div>
          <label htmlFor="password">Date</label>
          <input
            type="date"
            id="date"
            name="shooting_date"
            value={bookingInfo["shooting_date"]}
            onChange={handleChange}
            placeholder={new Date().getTime.toString()}
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
            placeholder={new Date().getTime.toString()}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
      </form>
    </div>
  );
};

export default BookingProcessOne;
