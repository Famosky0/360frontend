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
  const [phoneError, setPhoneError] = useState("");
  const [profileData, setProfileData] = useState<profileSchema | null>(null);

  useEffect(() => {
    // You might want to call this function when the component mounts
    // or based on some other action, depending on your application logic.
    getUserProfile();
  }, []);

  const validatePhoneNumber = (value: string) => {
    const pattern = /^\+234\d{10}$/;
    return pattern.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      if (validatePhoneNumber(value)) {
        setBookingInfo({ ...bookingInfo, [name]: value });
        setPhoneError(""); // Clear error message
      } else {
        setPhoneError("Invalid phone number, must match +234 followed by 10 digits.");
      }
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
        setProfileData(data); // Set the data in the local state
      }
    }
  };

  return (
    <form>
      {/* ... Other form elements ... */}

      <label htmlFor="Phone_number">Phone Number</label>
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

      {/* ... Rest of your form elements ... */}

      {/* Display profile information if it has been retrieved */}
      {profileData && (
        <div>
          {/* Display various parts of the profile here */}
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          {/* ... */}
        </div>
      )}

      {/* ... Submit button or other controls ... */}
    </form>
  );
};

export default BookingProcessOne;
