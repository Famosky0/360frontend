"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { userRegistration } from "@/services/request";
import Loader from "@/Loader/Loader";
import { useRouter } from "next/navigation";

// Modal Components
import OTPVerificationModal from "@/components/OTPVerificationModal";

const RegisterPage = () => {
  interface registerProps {
    first_name: string;
    last_name: string;
    email: string;
    password: any;
    terms_agreement: boolean;
  }

  const [registrationDetails, setRegistrationDetails] = useState<registerProps>(
    {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      terms_agreement: true,
    }
  );

  const router = useRouter();

  const [changing, setChanging] = useState(false);
  const [valid, setValid] = useState(false);
  const [pass, setPass] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRequestedOTP, setIsRequestedOTP] = useState<Boolean>(false);

  const handleChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;

    setRegistrationDetails({ ...registrationDetails, [name]: value });
    setChanging(!changing);
  };

  useEffect(() => {
    if (pass === registrationDetails["password"]) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
    if (
      registrationDetails["first_name"] &&
      registrationDetails["last_name"] &&
      registrationDetails["email"] &&
      registrationDetails["password"]
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [changing]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (valid && passwordMatch) {
      console.log("validating");
      setLoading(true);
      await userRegistration(registrationDetails);
      setIsRequestedOTP(true);
      setLoading(false);
    } else {
      console.log("not Valid");
    }
  };

  return (
    <>
      {/* {isRequestedOTP && (
        <OTPVerificationModal setIsRequestedOTP={setIsRequestedOTP} type="registeration"/>
      )} */}
      <div className="login-page w-full min-h-screen justify-center items-center flex">
        <div className="w-full max-w-[450px] bg-[#0F0F0F] rounded-2xl py-10 px-6">
          <div>
            <h1 className="text-3xl text-primary">Welcome Back!</h1>
            <p className="text-md text-white opacity-60 font-normal mt-1">
              Please enter a valid email and password
            </p>
          </div>
          <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={registrationDetails["first_name"]}
                onChange={handleChange}
                placeholder="Enter your First Name"
                className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={registrationDetails["last_name"]}
                onChange={handleChange}
                placeholder="Enter your Last Name"
                className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
              />
            </div>
            <div>
              <label htmlFor="email_address">Email address</label>
              <input
                type="email"
                id="email_address"
                name="email"
                value={registrationDetails["email"]}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={registrationDetails["password"]}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
              />
            </div>
            <div>
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  setChanging(!changing);
                }}
                placeholder="Confirm password"
                className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
              />
            </div>
            <div>
              <Link href="/auth/forgot" className="text-primary float-right">
                Forgot password?
              </Link>
            </div>
            <div className="w-full flex flex-col gap-2.5">
              <button
                className="w-full min-h-12 bg-primary rounded-md mt-3"
                type="submit"
              >
                {loading ? <Loader /> : "Create an account"}
              </button>
              <Link
                href="/auth/login"
                className="w-full min-h-12 border border-primary text-primary rounded-md mt-3 flex justify-center items-center"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
