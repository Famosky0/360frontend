"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Ghost Image
import GhostImage from "../../../../../../public/ghost.jpeg";

// Components
import EmptyState from "../components/Nothing";
import { retrieveBookingDetails } from "@/services/adminRequest";

import DeliverImage from "../components/DeliverImage";

const UserProfile = () => {
  const [userBookingDetails, setUserBookingDetails] = useState<any>();

  const getUserId = () => {
    const currentPath = window.location.pathname;
    const parts = currentPath.split("/"); // Split the URL by "/"
    const id = parts[4];
    return id;
  };

  const getAllBookings = async () => {
    let userId = getUserId();
    console.log(userId);
    let data;
    const accessToken = localStorage.getItem("adminAccessToken");
    console.log("adminAccessToken: " + accessToken);
    if (accessToken) {
      data = await retrieveBookingDetails(accessToken, userId);
      if (data) {
        setUserBookingDetails(data);
      }
    } else {
      data = await retrieveBookingDetails("string", userId);
    }
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem("adminRefreshToken");
    if (refreshToken) {
      getAllBookings();
    } else {
      console.log("unAuthorized");
      window.location.pathname = "/auth/login";
    }
  }, []);

  const [isDelivering, setisDelivering] = useState<Boolean>(false);
  return (
    <>
      {isDelivering && (
        <DeliverImage
          setisDelivering={setisDelivering}
          bookingId={userBookingDetails?.id}
        />
      )}

      <div className="w-full  h-full text-white max-w-full min-w-full grid grid-cols-1 gap-8">
        <div className="w-full h-full flex flex-col gap-4">
          <div className="w-full max-w-full min-w-full flex justify-between items-center">
            <h1 className="text-xl font-semibold opacity-85">Deliveries</h1>
          </div>

          <div className="w-full max-w-full flex md:flex-row flex-col gap-x-12 gap-y-6">
            {userBookingDetails?.avatar ? (
              <div>
                <Image
                  src={userBookingDetails.avatar}
                  width={150}
                  height={150}
                  alt={`ghost Image`}
                  className="relative object-cover w-full rounded-lg shadow cursor-pointer"
                />
              </div>
            ) : (
              <div>
                <Image
                  src={GhostImage}
                  width={150}
                  height={150}
                  alt={`ghost Image`}
                  className="relative object-cover w-full rounded-lg shadow cursor-pointer"
                />
              </div>
            )}

            <div>
              <ul className="flex flex-col gap-6 font-medium text-lg">
                <li>Name: {userBookingDetails?.name}</li>
                <li>Phone Number: {userBookingDetails?.phone_number}</li>
                <li>
                  Booked Date: {userBookingDetails?.shooting_date};{" "}
                  {userBookingDetails?.shooting_time}
                </li>
                <li>Plan Type: {userBookingDetails?.plan}</li>
              </ul>
              <button
                className="w-full min-h-12 bg-primary rounded-md mt-6"
                onClick={() => setisDelivering(true)}
              >
                Deliver Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
