"use client";

import React from "react";

// Icons
import { IoSettingsSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { FaBars } from "react-icons/fa";

// Admin Store
import AdminStore from "../../../../store/store";

const AdminHeader = () => {
  // Close & Open dashboard Sidebar
  const ToggleSidebarFuncHandler = AdminStore(
    (state) => state.ToggleSidebarFuncHandler
  );

  return (
    <div>
      <div className="min-h-[80px] max-h-[80px h-[80px] px-6 w-full border-b bg-sidebar border-gy text-white flex justify-between items-center gap-6">
        <div>
          <h1 className="text-xl opacity-70 md:block hidden">Dashboard</h1>
          <FaBars
            className="text-3xl block md:hidden cursor-pointer font-normal"
            onClick={ToggleSidebarFuncHandler}
          />
        </div>
        <div className="w-full max-w-xl md:block hidden">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="w-full bg-transparent border placeholder-[gray]/40 border-gy text-gray-500 rounded-md min-h-12 mt-1.5 p-2 px-4"
          />
        </div>
        <div className="w-auto flex items-center gap-4">
          <div className="w-auto bg-dashboardGray p-2 rounded cursor-pointer text-xl">
            <IoSettingsSharp />
          </div>
          <div className="w-auto bg-dashboardGray p-2 rounded cursor-pointer text-xl">
            <IoNotifications />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
