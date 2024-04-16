"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { recentBookingsAndImages } from "@/services/request";
import BookingsTable from "./bookings/components/BookingsTable";
import Loader from "@/Loader/Loader";
import { bookingOverviewSchema } from "./components/Interface";

// Icons
import { LuPlus } from "react-icons/lu";
import { CiMoneyBill } from "react-icons/ci";
import { BsStars } from "react-icons/bs";
import RecentBookingsEmptyState from "./components/Nothing";
import BookingProcess from "./components/Bookings/BookingProcess";
import { type } from "os";

const DashboardHome = () => {
  const [recentData, setRecentData] = useState([]);
  const [recentImages, setRecentImages] = useState([]);
  const [overviewData, setOverviewData] = useState<bookingOverviewSchema>();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [isStartBookingProcess, setisStartBookingProcess] =
    useState<Boolean>(false);

  const getRecentData = async () => {
    let data;
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setLoading(true);
      data = await recentBookingsAndImages(accessToken);
      setLoading(false);
      if (data.recent_bookings) {
        setRecentData(data.recent_bookings);
      }
      setOverviewData(data);
      console.log(data);
    } else {
      data = await recentBookingsAndImages("string");
    }
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    //const refreshToken = "";
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

      <div className="w-full text-white max-w-full min-w-full grid grid-cols-1 gap-8">
        <div className="w-full max-w-full min-w-full flex justify-between items-center gap-4">
          <h1 className="text-xl font-semibold opacity-85">
            Dashboard Overview
          </h1>
          <button
            title="create bookings"
            onClick={() => setisStartBookingProcess(true)}
            className="bg-[var(--primary-color)] text-white text-sm shadow p-3 rounded-xl flex gap-1 items-center cursor-pointer"
          >
            <LuPlus className="text-xl" />{" "}
            <span className="md:block hidden">Create Booking</span>
          </button>
        </div>

        <div className="w-full max-w-full min-w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="w-full max-w-full min-w-full grid grid-cols-1 gap-8 ">
            <div className="w-full px-6 py-8 flex gap-5 bg-dashboardGray rounded-lg">
              {" "}
              <div className="bg-[#333333] text-3xl w-14 h-14 flex justify-center items-center rounded cursor-pointer">
                <CiMoneyBill />
              </div>
              <div className="w-auto flex flex-col gap-1">
                <h1 className="text-xl font-semibold">Total Bookings</h1>
                <p className="text-xl font-normal opacity-50">
                  {overviewData ? overviewData.total_bookings : 0}
                </p>
              </div>
            </div>
          </section>

          <section className="w-full max-w-full min-w-full grid grid-cols-1 gap-8 ">
            <div className="w-full px-6 py-8 flex gap-5 bg-dashboardGray rounded-lg">
              <div className="bg-[#333333] text-3xl w-14 h-14 flex justify-center items-center rounded cursor-pointer">
                <BsStars />
              </div>

              <div className="w-auto flex flex-col gap-1">
                <h1 className="text-xl font-semibold">Pending Bookings</h1>
                <p className="text-xl font-normal opacity-50">
                  {overviewData ? overviewData.pending_bookings : 0}
                </p>
              </div>
            </div>
          </section>

          <section className="w-full max-w-full min-w-full grid grid-cols-1 gap-8 ">
            <div className="w-full px-6 py-8 flex gap-5 bg-dashboardGray rounded-lg">
              {" "}
              <div className="bg-[#333333] text-3xl w-14 h-14 flex justify-center items-center rounded cursor-pointer">
                <BsStars />
              </div>
              <div className="w-auto flex flex-col gap-1">
                <h1 className="text-2xl font-semibold opacity-85">
                  Gallery Image
                </h1>
                <p className="text-xl font-normal opacity-50">
                  {overviewData ? overviewData.images_total : 0}
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full max-w-full min-w-full flex justify-between items-center">
            <h1 className="text-xl font-semibold opacity-85">
              Recently Viewed Images
            </h1>
            <button
              title="create bucks"
              className="text-white text-sm shadow p-3 rounded-xl flex gap-1 items-center cursor-pointer"
            >
              See all
            </button>
          </div>

          <div>
            <div className="w-full">
              {loading ? (
                <>
                  <Loader />
                </>
              ) : (
                <>
                  {recentImages.length > 0 ? (
                    <>
                      {recentImages.map((image, index) => {
                        return (
                          <div className="gallery" key={index}>
                            <figure className="gallery__item gallery__item--1">
                              <Image
                                src={image ? image : "/shoot1.jpeg"}
                                alt="Gallery image 1"
                                className="w-full gallery__img"
                                width={105}
                                height={105}
                              />
                            </figure>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="w-full my-6">
                      <RecentBookingsEmptyState />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full max-w-full min-w-full flex justify-between items-center">
            <h1 className="text-xl font-semibold opacity-85">
              Recent Bookings
            </h1>
          </div>
          {recentData.length > 0 ? (
            <>
              <BookingsTable recentData={recentData} />
            </>
          ) : (
            <div className="w-full my-6">
              <RecentBookingsEmptyState />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
