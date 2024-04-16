"use client";

import React from "react";

// Components
import WhiteSpace from "@/components/WhiteSpace";

// Pattern
import Wavy_pattern from "../../public/wheel_pattern.png";

const ContactUsComponent = () => {
  return (
    <div
      className="md:py-12"
      style={{
        background: `url(${Wavy_pattern.src}) 100px no-repeat`,
        backgroundPosition: "bottom left",
        backgroundSize: "200px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <WhiteSpace>
        <div className="w-full flex flex-col gap-12">
          <div className="w-full text-center flex flex-col gap-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-primary">Contact us</h1>
            <p
              style={{ lineHeight: 1.7 }}
              className="text-lg font-normal text-white opacity-65 normal_text"
            >
              Over time, these are the questions that are frequently asked by
              our users. Check it out, your question might have just been
              answered
            </p>
          </div>
          <div className="relative w-full max-w-4xl mx-auto mt-20">
            <div>
              <div className="w-[90%] mx-auto min-h-[400px] bg-[rgba(255,255,255,0.7)] relative z-[99999] border rounded-xl -mt-20">
                <div className="w-full min-w-full max-w-full h-full min-h-full text-black p-4">
                  <div>
                    <h1 className="text-black text-center text-3xl">
                      Send us message
                    </h1>
                  </div>
                  <form className="w-full flex flex-col">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                      <div>
                        <label htmlFor="email_address">First Name</label>
                        <input
                          type="text"
                          id="full_name"
                          name="full_name"
                          placeholder="Enter your Full Name"
                          className="w-full bg-black rounded-md min-h-12 mt-1.5 p-2 text-white"
                          style={{ color: "white" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="email_address">Surname</label>
                        <input
                          type="email"
                          id="email_address"
                          name="email_address"
                          placeholder="Enter your email address"
                          className="w-full bg-black rounded-md min-h-12 mt-1.5 p-2 text-white"
                          style={{ color: "white" }}
                        />
                      </div>

                      <div>
                        <label htmlFor="password">Email Address</label>
                        <input
                          type="email"
                          id="email_address"
                          name="email_address"
                          placeholder="Email address"
                          className="w-full bg-black rounded-md min-h-12 mt-1.5 p-2 text-white"
                          style={{ color: "white" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="password">Phone Number</label>
                        <input
                          type="number"
                          id="phone_number"
                          name="phone_number"
                          placeholder="Phone Number"
                          className="w-full bg-black rounded-md min-h-12 mt-1.5 p-2 text-white"
                          style={{ color: "white" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="password">Phone Number</label>
                      <textarea
                        id="phone_number"
                        name="phone_number"
                        placeholder="Phone Number"
                        className="w-full bg-black rounded-md min-h-[100px] mt-1.5 p-2 text-white"
                        style={{ color: "white" }}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2.5">
                      <button className="w-auto min-h-14 bg-black text-white rounded-md mt-3">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WhiteSpace>
    </div>
  );
};

export default ContactUsComponent;
