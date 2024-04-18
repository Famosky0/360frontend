"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { retrieveAllUserBookings } from "@/services/request";
import RecentBookingsEmptyState from "../components/Nothing";

// Icons
import { IoArrowBackSharp } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import BookingsTable from "./components/BookingsTable";

// Components
import BookingProcess from "../components/Bookings/BookingProcess";

const Bookings = () => {
  const router = useRouter();
  const [isStartBookingProcess, setisStartBookingProcess] =
    useState<Boolean>(false);
  const [bookings, setBookings] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getRecentData = async () => {
    let data;
    const accessToken = localStorage.getItem("accessToken");
    console.log("token: " + accessToken);
    if (accessToken) {
      data = await retrieveAllUserBookings(accessToken);
      setBookings(data);
    } else {
      data = await retrieveAllUserBookings("string");
    }
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      getRecentData();
    } else {
      console.log("unAuthorized");
      window.location.pathname = "/auth/login";
    }
  }, []);

  useEffect(() => {
    getRecentData();
  }, [refresh]);

  return (
    <>
      {isStartBookingProcess && (
        <BookingProcess
          setisStartBookingProcess={setisStartBookingProcess}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
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

          <button
            title="create bookings"
            onClick={() => setisStartBookingProcess(true)}
            className="bg-[var(--primary-color)] text-white text-sm shadow p-3 rounded-xl flex gap-1 items-center cursor-pointer"
          >
            <LuPlus className="text-xl" />{" "}
            <span className="md:block hidden">Create Booking</span>
          </button>
        </div>

        <div className="w-full">
          {bookings ? (
            <>
              <BookingsTable recentData={bookings} />
            </>
          ) : (
            <div className="w-full my-6">
              <RecentBookingsEmptyState />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Bookings;
