import React from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import WhiteSpace from "@/components/WhiteSpace";
import SocialHandles from "@/components/SocialHandles";
import MyCarousel from "@/components/MyCarousel";

const HeroSection = () => {
  const Images = ["/hero1.JPG", "/hero2.jpg", "/hero3.JPG"];
  return (
    <div className="w-full flex gap-2 flex-col">
      <WhiteSpace>
        <section className="w-full grid md:grid-cols-[0.4fr_0.6fr] grid-cols-1 gap-6 pb-12">
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col gap-2">
              <h1 className="text-5xl font-semibold text-primary">
                360 Shotitz Photography
              </h1>
              <p className="text-white text-lg font-normal normal_text">
                Capturing life’s special moments that last a lifetime with
                professionalism and innovation since 2013.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex gap-12 my-4">
                <div className="flex flex-col items-start justify-start">
                  <h2 className="text-3xl text-primary">1206+</h2>
                  <p>Happy Clients</p>
                </div>
                <div className="flex flex-col items-start justify-start">
                  <h2 className="text-3xl text-primary">10+</h2>
                  <p>Work Experience </p>
                </div>
              </div>
              <Link href="/">
                <button className="w-3/5 py-3 px-6 shadow inline-flex bg-[var(--primary-color)] hover:text-main justify-center items-center gap-2 rounded-full font-medium text-white align-middle transition-all text-md">
                  Learn More
                </button>
              </Link>
            </div>
            <div className="w-full mt-6">
              <SocialHandles />
            </div>
          </div>
          <div className="relative w-full h-full md:block hidden">
            {/* <MyCarousel/> */}
            <div className="w-full h-full flex overflow-x-scroll no-scrollbar gap-12 items-center absolute -bottom-12 left-0 right-0 min-h-[450px]">
              {Images.map((image, index) => {
                return (
                  <div
                    className="w-full h-full flex flex-col gap-2 no-scrollbar rounded group min-w-[250px]"
                    key={index}
                  >
                    <div className="overflow-hidden rounded">
                      <Image
                        src={image}
                        alt="wedding shoot"
                        width={1000}
                        height={1000}
                        className="w-full max-w-full object-cover rounded group-hover:scale-125 transition-all"
                      />
                    </div>
                    <div className="text-black py-2 flex justify-between gap-4">
                      <div className="w-auto flex flex-col gap-1">
                        <p>Cole & Kemi </p>
                        <p className="ml-12">Wedding Video</p>
                      </div>
                      <div>
                        <p>2021</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </WhiteSpace>
      {/* <div className="w-full bg-white text-black min-h-[250px] py-6">
        <WhiteSpace>
          <div className="relative">
            <h1 className="flex items-center gap-2">
              Scroll down{" "}
              <span>
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className="mt-1"
                >
                  <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                </svg>
              </span>
            </h1>
          </div>
        </WhiteSpace>
      </div> */}
    </div>
  );
};

export default HeroSection;
