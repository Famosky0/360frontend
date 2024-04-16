"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getPhotos } from "@/services/request";
import RecentBookingsEmptyState from "../components/Nothing";

// Icons
import { IoArrowBackSharp } from "react-icons/io5";
import ImageDetails from "./ImageDetails";
import { photoDetails } from "../components/Interface";

// Components

const Gallery = () => {
  const router = useRouter();
  const [photos, setPhotos] = useState([]);
  const [popUp, setPopUp] = useState<Boolean>(false);

  const getAllPhotos = async () => {
    let data;
    const accessToken = localStorage.getItem("accessToken");
    console.log("token: " + accessToken);
    if (accessToken) {
      data = await getPhotos(accessToken);
      setPhotos(data);
      console.log(data);
    } else {
      data = await getPhotos("string");
    }
  };

  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      getAllPhotos();
    } else {
      console.log("unAuthorized");
      window.location.pathname = "/auth/login";
    }
  }, []);
  return (
    <main className="w-full text-white max-w-full min-w-full grid grid-cols-1 gap-8">
      {popUp && <ImageDetails imageDetails={details} setPopUp={setPopUp} />}
      <div className="w-full max-w-full min-w-full flex justify-between items-center">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => router.back()}
        >
          <div className="p-1 bg-white text-black rounded-full">
            <IoArrowBackSharp className="text-xl" />
          </div>
          <button className="text-2xl ">Gallery</button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div>
          <p className="text-lg opacity-50">December 23, 2024</p>
        </div>
        <div className="w-full grid md:grid-cols-5 grid-cols-1 gap-6">
          {photos.length > 0 ? (
            <>
              {photos?.map((photo: photoDetails, index: any) => {
                return (
                  <>
                    <figure
                      key={index}
                      className="cursor-pointer"
                      onClick={() => {
                        console.log(photo);
                        setDetails(photo);
                        setPopUp(true);                        
                      }}
                    >
                      <Image
                        src={`${
                          photo.cover_image ? photo.cover_image : "/shoot1.jpeg"
                        }`}
                        alt="Gallery image 1"
                        className="w-full bg-cover"
                        width={105}
                        height={55}
                      />
                    </figure>
                  </>
                );
              })}
            </>
          ) : (
            <RecentBookingsEmptyState />
          )}
        </div>
      </div>
    </main>
  );
};

export default Gallery;
