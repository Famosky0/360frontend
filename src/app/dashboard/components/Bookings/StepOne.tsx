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
    let name = e.target.name;
    let value = e.target.value;
    setBookingInfo({ ...bookingInfo, [name]: value });
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month: string | number = currentDate.getMonth() + 1;
    let day: string | number = currentDate.getDate();

    // Pad month and day with leading zeros if needed
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const currentTime = new Date();
    let hour: string | number = currentTime.getHours();
    let minute: string | number = currentTime.getMinutes();

    // Pad hour and minute with leading zeros if needed
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }

    return `${hour}:${minute}`;
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
          <label htmlFor="Phone_number">WhatsApp Number</label>
          <input
            type="number"
            id="Phone_number"
            name="phone"
            value={bookingInfo["phone"]}
            onChange={handleChange}
            placeholder="+2348149055068"
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
            placeholder={getCurrentDate()}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="time">Time (when are you shooting?) </label>
          <input
            type="time"
            id="time"
            name="shooting_time"
            value={bookingInfo["shooting_time"]}
            onChange={handleChange}
            placeholder={getCurrentTime()}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
      </form>
    </div>
  );
};

export default BookingProcessOne;
