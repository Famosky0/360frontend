"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "../../../Loader/Loader";
import { userLogin } from "../../../services/request";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/services/adminRequest";

const LoginPage = () => {
  interface loginProps {
    email: string;
    password: any;
  }

  const [loginDetails, setLoginDetails] = useState<loginProps>({
    email: "",
    password: "",
  });

  const [changing, setChanging] = useState(false);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;

    setLoginDetails({ ...loginDetails, [name]: value });
    setChanging(!changing);
  };

  const router = useRouter();

  useEffect(() => {
    if (loginDetails["email"] && loginDetails["password"]) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [changing]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (valid) {
      console.log("validating");
      setLoading(true);
      if (loginDetails["email"] === "testadmin@email.com") {
        localStorage.setItem("Type", "admin");
        await adminLogin(loginDetails, router);
      } else {
        localStorage.setItem("Type", "client");
        await userLogin(loginDetails, router);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-page w-full min-h-screen justify-center items-center flex">
        <div className="w-full max-w-[450px] bg-[#0F0F0F] rounded-2xl py-10 px-6">
          <div>
            <h1 className="text-3xl text-primary">Welcome Back!</h1>
            <p className="text-md text-white opacity-60 font-normal mt-1">
              Please enter your email and password
            </p>
          </div>
          <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email_address">Email address</label>
              <input
                type="email"
                id="email_address"
                name="email"
                value={loginDetails["email"]}
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
                value={loginDetails["password"]}
                onChange={handleChange}
                placeholder="Password"
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
                {loading ? <Loader /> : "Login"}
              </button>
              <Link
                href="/auth/register"
                className="w-full min-h-12 border border-primary text-primary rounded-md mt-3 flex justify-center items-center"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
