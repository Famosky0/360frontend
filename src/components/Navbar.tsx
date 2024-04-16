"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import WhiteSpace from "@/components/WhiteSpace";

// Brand Logo
import ShotitzLogo from "../../public/brand/logo.jpeg";

// Icons
import { MdArrowOutward } from "react-icons/md";

// Navbar Data
import NavBarData from "@/data";

export default function NavBar() {
  const [isClicked, setIsClicked] = useState(false);

  //=> Functionality: Handle Navigation Bar
  const handleIsClicked = () => {
    setIsClicked(!isClicked);
  };
  return (
    <>
      <nav className="w-full max-w-full min-w-full py-2">
        <WhiteSpace>
          <div className="w-full flex flex-col rounded-xl md:flex-row gap-3 justify-between backdrop-blur bg-black/30 text-base font-medium text-white">
            <div className="w-full flex justify-between items-center">
              <div>
                {/* APPLICATION LOGO */}
                <div>
                  <Link href="/">
                    <Image
                      src={ShotitzLogo}
                      priority={true}
                      alt="scanr logo"
                      className="w-[120px] object-cover -ml-6"
                    />
                  </Link>
                </div>
              </div>

              <div className="items-center hidden md:flex gap-12">
                {/* LARGE SCREEN NAVIGATION MENU */}
                <ul className={`gap-10 hidden flex-col md:flex-row md:flex`}>
                  {NavBarData.map((data) => {
                    return (
                      <li key={data.id}>
                        <Link
                          href={`${data.url}`}
                          className="relative hover:text-primary transition-all font-normal text-lg flex items-center flex-3"
                        >
                          {data.title}
                          {data.hasIcon && (
                            <MdArrowOutward className="text-xl mx-1" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* QUICK ACTION BUTTONS  */}
                <Link href="/auth/login">
                  <button className="h-10 w-32 shadow inline-flex bg-[var(--primary-color)] hover:text-main justify-center items-center gap-2 rounded-full font-medium text-white align-middle transition-all text-md">
                    Login
                  </button>
                </Link>
              </div>

              {/* HAMBURGER MOBILE MENU */}
              <div className="block md:hidden" onClick={handleIsClicked}>
                <div className="hamburger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 cursor-pointer font-bold text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* HANDLE MOBILE NAVIGATION */}
            <div>
              {isClicked && (
                <MobileNavigationMenu handleIsClicked={handleIsClicked} />
              )}
            </div>
          </div>
        </WhiteSpace>
      </nav>
    </>
  );
}

const MobileNavigationMenu = ({
  handleIsClicked,
}: {
  handleIsClicked: () => void;
}) => {
  return (
    <div className="w-full mt-3 block md:hidden text-center">
      <div className="w-full">
        {/* LARGE SCREEN NAVIGATION MENU */}
        <ul className={`gap-10 flex-col md:flex-row flex`}>
          {NavBarData.map((data) => {
            return (
              <li key={data.id}>
                <Link
                  href={`${data.url}`}
                  onClick={handleIsClicked}
                  className="relative text-3xl hover:text-main font-light hover:text-primary transition-all"
                >
                  {data.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
