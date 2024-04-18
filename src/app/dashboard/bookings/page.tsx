"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IoArrowBackSharp } from 'react-icons/io5';
import { LuPlus } from 'react-icons/lu'; // Assuming this is a valid icon, ensure you have the correct import for your icons.
import BookingProcess from './BookingProcess';
import BookingsTable from './BookingsTable';
import RecentBookingsEmptyState from './RecentBookingsEmptyState';

const Bookings = () => {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [isStartBookingProcess, setisStartBookingProcess] = useState(false);
  const [bookings, setBookings] = useState(null);

  const getRecentData = async () => {
    // Assuming fetch logic to get booking data
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
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
  }, [refresh]);

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
            <button className="text-2xl">Bookings</button>
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
            <BookingsTable recentData={bookings} />
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
