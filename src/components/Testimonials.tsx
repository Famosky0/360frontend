"use client";

import React, { useState } from "react";
import Image from "next/image";

// Components
import WhiteSpace from "@/components/WhiteSpace";

// Pattern
import Wavy_pattern from "../../public/wheel_pattern.png";

interface ITestimonial {
  id: number;
  image: string;
  testimony: string;
  name: string;
}

const Clients_Testimonial: ITestimonial[] = [
  {
    id: 1,
    image: "Are you available to travel?",
    testimony:
      "Even though the notice was short, 360 Shotitz came through for my in-house birthday photoshoot. They gave me the best shots I’ve ever had. I wanted 5 pictures but ended up choosing 13 because all came out good. The angle, the style, and the editing were on point.",
    name: "Shola Adekunle",
  },
  {
    id: 2,
    image: "What is your style?",
    testimony:
      "Had a wonderful experience with the team. The camera guys explained the whole process in detail and made it a worthwhile experience.  The process of scheduling, location, and receiving my videos and pictures was streamless. I highly recommend them.",
    name: "Christiana Johnson",
  },
  {
    id: 3,
    image: "How do i book?",
    testimony:
      "This place is amazing. The studio has a lot of professional lighting and the photographer did an incredible job. I was told where to look, how to pose, and when to smile, which I think contributed to the awesome look of my pictures. I have them plastered all over my social media accounts and my friends keep saying good things about me. I am highly appreciative of this studio. I’ll definitely be back for more studio sections.",
    name: "Ruth Aderogba",
  },
  {
    id: 3,
    image: "How do i book?",
    testimony:
      "Great job guys. My wedding pictures and videos are so clear and detailed. I’m glad I listened to my friend’s recommendation of this company. If you require a competent company for your digital needs, this is the right place.",
    name: "Feyi Adeagbo",
  },
];

const Testimonials = () => {
  const [testimonyIndex, setTestimonyIndex] = useState(0);
  return (
    <div
      className="py-12"
      style={{
        background: `url(${Wavy_pattern.src}) 100px no-repeat`,
        backgroundPosition: "top right",
        backgroundSize: "200px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <WhiteSpace>
        <div className="w-full flex flex-col gap-12">
          <div className="w-full text-center flex flex-col gap-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold">Testimonials</h1>
            <p
              style={{ lineHeight: 1.7 }}
              className="text-lg font-normal text-white opacity-65 normal_text"
            >
              Here is some of the feedbacks we have gotten from our customers
              over time. Join the clique now!
            </p>
          </div>
        </div>
      </WhiteSpace>
      <div className="w-[90%] mt-12 md:mx-0 mx-auto">
        <div className="w-full bg-[#090909] border md:border-l-0 border-l border-[#fafafa2d] min-h-[300px] rounded-[12px_12px] md:rounded-[0_12px_12px_0] py-6 pr-12 pl-6">
          <div className="w-full grid grid-cols-1 md:grid-cols-[0.4fr_0.6fr] gap-6">
            <div>
              <Image
                src="/shoot1.jpeg"
                alt="Gallery image 1"
                className="w-full max-h-full h-full min-h-full object-cover rounded-xl"
                width={105}
                height={105}
                style={{ height: "200px" }}
              />
            </div>
            <div>
              <svg
                fill="#ffffff"
                width="50px"
                height="50px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>quote</title>
                <path d="M9.563 8.469l-0.813-1.25c-5.625 3.781-8.75 8.375-8.75 12.156 0 3.656 2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 0-2.156-1.375-4-3.219-4.688-0.531-0.188-1.031-0.344-1.031-1.25 0-1.156 0.844-2.875 3.938-5.344zM21.969 8.469l-0.813-1.25c-5.563 3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 5.375 5.031 5.375 2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-0.531-0.188-1-0.344-1-1.25 0-1.156 0.875-2.875 3.875-5.344z"></path>
              </svg>
              <p className="text-lg mt-12 normal_text">
                {Clients_Testimonial[testimonyIndex].testimony}
              </p>
              <div className="w-full flex justify-between gap-4 items-center mt-6">
                <h2 className="text-2xl">
                  {Clients_Testimonial[testimonyIndex].name}
                </h2>
                <div
                  onClick={() => {
                    if (testimonyIndex < Clients_Testimonial.length - 1) {
                      return setTestimonyIndex(testimonyIndex + 1);
                    } else {
                      setTestimonyIndex(0);
                    }
                  }}
                >
                  <svg
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    className="cursor-pointer"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12H20M20 12L16 8M20 12L16 16"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-full flex justify-end gap-4 items-center mt-6">
                <svg
                  fill="#ffffff"
                  width="50px"
                  height="50px"
                  viewBox="0 0 32 32"
                  className="rotate-180"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>quote</title>
                  <path d="M9.563 8.469l-0.813-1.25c-5.625 3.781-8.75 8.375-8.75 12.156 0 3.656 2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 0-2.156-1.375-4-3.219-4.688-0.531-0.188-1.031-0.344-1.031-1.25 0-1.156 0.844-2.875 3.938-5.344zM21.969 8.469l-0.813-1.25c-5.563 3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 5.375 5.031 5.375 2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-0.531-0.188-1-0.344-1-1.25 0-1.156 0.875-2.875 3.875-5.344z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
