"use client";

import React, { useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;

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

  return (
    <div>
      <form>
        {/* Example input for phone number */}
        <input
          type="tel"
          id="Phone_number"
          name="phone"
          value={bookingInfo["phone"]}
          onChange={handleChange}
          placeholder="+2348149055068"
          className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
        />
        {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default BookingProcessOne;
