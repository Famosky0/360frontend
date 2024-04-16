"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { logOutUser } from "@/services/request";

// Bucks Logo
import ShotitZPhotographyLogo from "../../../../public/brand/dlogo.png";

// Icon
import { RiHome5Line } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { MdOutlineLibraryBooks } from "react-icons/md";

// Admin Store
import AdminStore from "../../../../store/store";

// SideBar Component
const BucksSideBar = () => {
  const router = useRouter();

  const isDashboardSidebarOpen = AdminStore(
    (state) => state.isDashboardSidebarOpen
  );

  // Close & Open dashboard Sidebar
  const ClosedashboarSidebar = AdminStore(
    (state) => state.CloseSidebarFuncHandler
  );

  // Sign Out
  async function signOutHandler() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      await logOutUser(accessToken);
    }
    localStorage.clear();
    // Redirect to login page
    router.push("/auth/login")
    // location.reload();
  }

  return (
    <div
      className={`md:relative md:w-full w-[250px] md:h-screen bg-sidebar border-gy border-r border-t shadow-sm px-1 md:block transition-all duration-[1s] fixed h-screen z-[999999] ${
        !isDashboardSidebarOpen ? "left-[-100%] md:left-0" : "left-0"
      }`}
    >
      <div className="w-full max-w-full min-w-full min-h-[80px h-[80px] max-h-[80px] flex justify-start items-center border-gy border-b px-6">
        <Link
          href="/dashboard"
          onClick={ClosedashboarSidebar}
          className="text-center"
        >
          <div className="w-auto bg-dashboardGray py-4 px-10 rounded cursor-pointer">
            <Image
              src={ShotitZPhotographyLogo}
              alt="shotitz photography logo"
              className="w-full cursor-pointer bg-cover"
              onClick={ClosedashboarSidebar}
            />
          </div>
        </Link>
      </div>
      <div className="relative w-full max-w-full min-w-full py-6 px-3">
        <div className="sidebar-items w-full flex flex-col gap-3 items-start justify-start text-dashboardText">
          <Link
            href="/dashboard"
            onClick={ClosedashboarSidebar}
            className="font-medium flex items-center gap-2 cursor-pointer py-3 px-4 w-full rounded hover:bg-dashboardGray"
          >
            <RiHome5Line className="text-xl" />
            <p className=" text-[16px]">Home</p>
          </Link>
          <Link
            href="/dashboard/bookings"
            onClick={ClosedashboarSidebar}
            className="w-full font-normal flex items-center gap-2 cursor-pointer py-3 px-4 rounded hover:bg-dashboardGray"
          >
            <MdOutlineLibraryBooks className="text-xl " />
            <p className=" text-[16px]">Bookings</p>
          </Link>
          <Link
            href="/dashboard/gallery"
            onClick={ClosedashboarSidebar}
            className="w-full font-normal flex items-center gap-2 cursor-pointer py-3 px-4 rounded hover:bg-dashboardGray"
          >
            <GrGallery className="text-xl " />
            <p className=" text-[16px]">Gallery</p>
          </Link>
          <Link
            href="/dashboard/profile"
            onClick={ClosedashboarSidebar}
            className="w-full font-normal flex items-center gap-2 cursor-pointer py-3 px-4 rounded hover:bg-dashboardGray"
          >
            <AiOutlineUser className="text-xl " />
            <p className=" text-[16px]">Profile</p>
          </Link>
          <div
            onClick={signOutHandler}
            className="w-full font-normal flex items-center gap-2 cursor-pointer py-3 px-4 rounded hover:bg-dashboardGray"
          >
            <TbLogout className="text-xl " />
            <p className=" text-[16px]">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BucksSideBar;
