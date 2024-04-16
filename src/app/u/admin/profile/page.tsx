"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { retrieveProfile, updateProfile } from "@/services/request";
import FileBase64 from "react-file-base64";

// Icons
import { LuPlus } from "react-icons/lu";
import { IoArrowBackSharp } from "react-icons/io5";

// Ghost Image
import GhostImage from "../../../../../public/ghost.jpeg";

// Define the type  element (HTMLInputElement)
type InputRefType = HTMLInputElement;

const ProfilePage = () => {
  const router = useRouter();

  interface profileSchema {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  }

  //  Profile details
  const [profile, setProfile] = useState<profileSchema>({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  // Create target REF
  const upload_ref = useRef<InputRefType>(null);

  // Upload Image With Preview
  const UploadFileHandler = () => {
    return upload_ref.current?.click();
  };

  // OnUpload Image
  const OnChangeUploadFile = async (base64: any) => {
    if (
      base64.type === "image/png" ||
      base64.type === "image/jpg" ||
      base64.type === "image/jpeg" ||
      base64.type === "image/jfif"
    ) {
      setProfile({ ...profile, avatar: base64.base64 });
      // Call API to upload image to database
      updateProfile({
        first_name: profile.first_name,
        last_name: profile.last_name,
        avatar: base64.file,
      });
      console.log(profile);
    }
    console.log(base64);
  };

  const getUserProfile = async () => {
    let data = [];
    const accessToken = localStorage.getItem("adminAccessToken");
    console.log("token: " + accessToken);
    if (accessToken) {
      data = await retrieveProfile(accessToken);
      console.log(data);
      if (data) {
        setProfile(data);
      }
    } else {
      data = await retrieveProfile("string");
    }
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem("adminRefreshToken");
    if (refreshToken) {
      getUserProfile();
    } else {
      console.log("unAuthorized");
      window.location.pathname = "/auth/login";
    }
  }, []);

  return (
    <main className="w-full text-white max-w-full min-w-full grid grid-cols-1 gap-8">
      <div className="w-full max-w-full min-w-full">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => router.back()}
        >
          <div className="p-1 bg-white text-black rounded-full">
            <IoArrowBackSharp className="text-xl" />
          </div>
          <button className="text-2xl ">Profile</button>
        </div>
      </div>

      <div className="relative shadow rounded-lg">
        <div className="relative flex items-center">
          <form
            onSubmit={() => alert("Picture Uploaded")}
            className="w-full flex flex-col gap-6"
          >
            <div className="flex">
              <div onClick={UploadFileHandler} className="relative w-auto">
                <div className="relative flex flex-col">
                  {profile["avatar"] ? (
                    <div className="relative w-auto transition-all rounded flex items-center justify-center">
                      <Image
                        src={profile["avatar"]}
                        width={40}
                        height={40}
                        alt={`Profile Image`}
                        className="relative object-cover w-40 h-40 rounded-lg shadow-sm cursor-pointer"
                      />
                    </div>
                  ) : (
                    <Image
                      src={GhostImage}
                      width={40}
                      height={40}
                      alt={`ghost Image`}
                      className="relative object-cover w-40 h-40 rounded-lg shadow cursor-pointer"
                    />
                  )}
                  <div className="absolute -bottom-2 -right-2 bg-[var(--primary-color)] shadow-md rounded-lg text-3xl p-1.5 flex items-center justify-center cursor-pointer">
                    <LuPlus
                      className="text-xl cursor-pointer text-white"
                      // onClick={UploadFileHandler}
                    />
                    <div className="absolute opacity-0">
                      <FileBase64
                        name="cover"
                        defaultValue={
                          profile["avatar"] ? profile.avatar : GhostImage
                        }
                        multiple={false}
                        onDone={(base64: any) => {
                          OnChangeUploadFile(base64);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-[60%_1fr] gap-2 md:mt-12 justify-start items-start">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl ">Email </h1>
                <p className="opacity-50">
                  Used to sign into and receive notifications for this account.
                </p>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={profile["email"]}
                  readOnly
                  placeholder="Email address"
                  className="w-full bg-transparent border border-gy text-gray-500 rounded-md min-h-12 mt-1.5 p-2"
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-[60%_1fr] gap-2 md:mt-12 justify-start items-start">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl ">Password </h1>
                <p className="opacity-50">Edit password</p>
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full bg-transparent border border-gy text-gray-500 rounded-md min-h-12 mt-1.5 p-2"
                />
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  className="w-full bg-transparent border border-gy text-gray-500 rounded-md min-h-12 mt-1.5 p-2"
                />
                <button className="w-full min-h-12 bg-primary rounded-md mt-3">
                  Change password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
