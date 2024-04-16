"use client";

import React, { useState, useEffect } from "react";

// Icons
import { CiMoneyBill } from "react-icons/ci";
import { BsStars } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { adminBookingOverviewSchema } from "@/app/dashboard/components/Interface";
import {
  retrieveAllUserBookings,
  adminDashboardDetails,
} from "@/services/adminRequest";

// Components
// import RecentBookingsEmptyState from "./components/Nothing";

const DashboardHome = () => {
  const [adminDetails, setAdminDetails] =
    useState<adminBookingOverviewSchema>();

  const getRecentData = async () => {
    let data;
    const accessToken = localStorage.getItem("adminAccessToken");
    console.log("adminAccessToken: " + accessToken);
    if (accessToken) {
      data = await adminDashboardDetails(accessToken);
      if (data) {
        setAdminDetails(data);
      }
      console.log(data.recent_bookings);
    } else {
      data = await adminDashboardDetails("string");
    }
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem("adminRefreshToken");
    //const refreshToken = "";
    if (refreshToken) {
      getRecentData();
    } else {
      console.log("unAuthorized");
      window.location.pathname = "/auth/login";
    }
  }, []);
  return (
    <>
      <div className="w-full overflow-auto text-white max-w-full min-w-full grid grid-cols-1 gap-8">
        <div className="w-full max-w-full min-w-full flex justify-between items-center gap-4">
          <h1 className="text-xl font-semibold opacity-85">
            Dashboard Overview
          </h1>
        </div>

        <div className="w-full max-w-full min-w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="w-full max-w-full min-w-full grid grid-cols-1 gap-8 ">
            <div className="w-full px-6 py-8 flex gap-5 bg-dashboardGray rounded-lg">
              {" "}
              <div className="bg-[#333333] text-3xl w-14 h-14 flex justify-center items-center rounded cursor-pointer">
                <CiMoneyBill />
              </div>
              <div className="w-auto flex flex-col gap-1">
                <h1 className="text-xl font-semibold">Pending Bookings</h1>
                <p className="text-xl font-normal opacity-50">
                  {adminDetails ? adminDetails.pending_bookings : 0}
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
                <h1 className="text-xl font-semibold">Processing Bookings</h1>
                <p className="text-xl font-normal opacity-50">
                  {adminDetails ? adminDetails.processing_bookings : 0}
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
                <h1 className="text-xl font-semibold opacity-85">
                  Completed Bookings
                </h1>
                <p className="text-xl font-normal opacity-50">
                  {adminDetails ? adminDetails.completed_bookings : 0}
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full max-w-full min-w-full flex justify-between items-center">
            <h1 className="text-xl font-semibold opacity-85">
              Recent Bookings
            </h1>
            <button
              title="create bucks"
              className="text-white text-sm shadow p-3 rounded-xl flex gap-1 items-center cursor-pointer"
            >
              See all
            </button>
          </div>

          <div>
            <BookingsTable
              recentBookings={adminDetails?.recent_bookings}
              type="pending"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full max-w-full min-w-full flex justify-between items-center">
            <h1 className="text-xl font-semibold opacity-85">
              Recently Delivered
            </h1>
          </div>

          <div>
            <BookingsTable
              recentBookings={adminDetails?.recently_delivered}
              type="delivered"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const BookingsTable = ({
  recentBookings,
  type,
}: {
  recentBookings: any;
  type: string;
}) => {
  const router = useRouter();
  return (
    <>
      <div className="overflow-y-auto h-[70vh] rounded-lg text-white shadow-md">
        <table className="w-full border-collapse bg-transparent text-left text-sm text-white">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Picture Delivererd
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Shooting Date
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Shooting Time
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Plan Type
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="w-full  border-gray-100 opacity-70 ">
            {recentBookings?.map((item: any, index: any) => {
              return (
                <tr
                  className="w-full hover:bg-[white]/10 cursor-pointer"
                  key={index}
                  onClick={() => {
                    type === "pending" &&
                      router.push(`/u/admin/bookings/${item?.id}`);
                  }}
                >
                  <td className="flex gap-3 px-6 py-4 font-normal">
                    <div className="text-sm">
                      <h2 className="font-medium">{item?.name}</h2>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <h2 className="font-medium">08138395869</h2>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item?.number_of_shoot}</td>
                  <td className="px-6 py-4">{item?.payment_status}</td>
                  <td className="px-6 py-4">{item?.shooting_date}</td>
                  <td className="px-6 py-4">{item?.shooting_time}</td>
                  <td className="px-6 py-4">{item?.plan}</td>
                  <td className="px-6 py-4">₦{item?.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardHome;
