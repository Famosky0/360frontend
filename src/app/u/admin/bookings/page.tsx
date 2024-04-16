"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Icons
import { IoArrowBackSharp } from "react-icons/io5";

// Components
import BookingsTable from "./components/BookingsTable";
import { retrieveAllUserBookings } from "@/services/adminRequest";
import { adminBookingOverviewSchema } from "@/app/dashboard/components/Interface";

const Bookings = () => {
  const router = useRouter();
  const [allBookings, setAllBookings] = useState<any>([]);

  const getAllBookings = async () => {
    let data;
    const accessToken = localStorage.getItem("adminAccessToken");
    console.log("adminAccessToken: " + accessToken);
    if (accessToken) {
      data = await retrieveAllUserBookings(accessToken);
      if (data) {
        setAllBookings(
          [].concat(
            ...data.pending_bookings,
            ...data.processing_bookings,
            ...data.delivered_bookings
          )
        );
      }      
    } else {
      data = await retrieveAllUserBookings("string");
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

  return (
    <>
      <main className="w-full text-white max-w-full min-w-full grid grid-cols-1 gap-8">
        <div className="w-full max-w-full min-w-full flex justify-between items-center gap-4">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => router.back()}
          >
            <div className="p-1 bg-white text-black rounded-full">
              <IoArrowBackSharp className="text-xl" />
            </div>
            <button className="text-2xl ">Bookings</button>
          </div>
        </div>

        <div className="w-full">
          <BookingsTable allBookings={allBookings}/>
        </div>
      </main>
    </>
  );
};

export default Bookings;
