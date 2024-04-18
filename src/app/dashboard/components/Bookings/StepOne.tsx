"use client";

import React, { useEffect, useState } from "react";
import { bookingSchema, profileSchema } from "../Interface";
import { retrieveProfile, getOperationalHours } from "@/services/request";

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
  const [phoneError, setPhoneError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [profileData, setProfileData] = useState<profileSchema | null>(null);

  useEffect(() => {
    getUserProfile();
  }, []);

  const validatePhoneNumber = (value: string) => {
    const pattern = /^\+234\d{10}$/;
    return pattern.test(value);
  };

  const checkTimeAvailability = async (chosenTime: string) => {
    const operationalHours = await getOperationalHours(); // API call to fetch operational hours
    const { openTime, closeTime } = operationalHours; // Assuming API returns an object with openTime and closeTime
    const chosenDate = new Date(chosenTime);
    const openDate = new Date(`1970-01-01T${openTime}:00`);
    const closeDate = new Date(`1970-01-01T${closeTime}:00`);

    if (chosenDate >= openDate && chosenDate < closeDate) {
      setTimeError(""); // Clear any previous error message
    } else {
      setTimeError("The studio will be closed at the time you selected.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      if (validatePhoneNumber(value)) {
        setBookingInfo({ ...bookingInfo, [name]: value });
        setPhoneError("");
      } else {
        setPhoneError("Invalid phone number, must match +234 followed by 10 digits.");
      }
    } else if (name === 'time') {
      checkTimeAvailability(value);
      setBookingInfo({ ...bookingInfo, [name]: value });
    } else {
      setBookingInfo({ ...bookingInfo, [name]: value });
    }
  };

  const getUserProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const data = await retrieveProfile(accessToken);
      if (data) {
        setProfile(data);
        setProfileData(data);
      }
    }
  };

  return (
    <form>
      <label htmlFor="Phone_number">lPhone Number</label>
      <input
        type="tel"
        id="Phone_number"
        name="phone"
        value={bookingInfo.phone}
        onChange={handleChange}
        placeholder="+2348149055068"
        className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
      />
      {phoneError && <div className="text-red-500">{phoneError}</div>}

      <label htmlFor="booking_time">Booking Time</label>
      <input
        type="time"
        id="booking_time"
        name="time"
        value={bookingInfo.time}
        onChange={handleChange}
        className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
      />
      {timeError && <div className="text-red-500">{timeError}</div>}

      {profileData && (
        <div>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
        </div>
      )}
    </form>
  );
};

export default BookingProcessOne;
