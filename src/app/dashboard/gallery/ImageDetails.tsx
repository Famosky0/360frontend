"use client";
import React, { Dispatch, SetStateAction } from "react";

import { photoDetails } from "../components/Interface";

const ImageDetails = ({
  imageDetails,
  setPopUp,
}: {
  imageDetails: photoDetails;
  setPopUp: Dispatch<SetStateAction<Boolean>>;
}) => {  
  console.log(imageDetails)
  const getDateTime = (dateString:string) => {
    const dateObject = new Date(dateString);

    // Get date components
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Months are zero-based
    const day = dateObject.getDate();

    // Get time components
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const milliseconds = dateObject.getMilliseconds();

    return `${year}-${month}-${day} At ${hours}:${minutes}:${seconds}.${milliseconds}`; 
  };
  return (
    <div
      className="w-full h-[100vh] overflow-y-scroll py-24 fixed top-0 left-0 right-0 z-[9999999999] flex gap-6 justify-center items-center cursor-default"
      onClick={() => {
        setPopUp(false);
      }}
    >
      <div
        className="relative bg-black w-[90%] md:w-[400px] rounded-lg p-3 border-[1px] px-4 md:px-10 py-6 pb-10 shadow-2xl flex gap-6 justify-start items-start"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col gap-5 mt-8">
          <div>
            <label className="font-bold text-primary" htmlFor="project_name">
              Project Name
            </label>
            <p>{imageDetails.project_name}</p>
          </div>
          <div>
            <label className="font-bold text-primary" htmlFor="date_and_time">
              Date & Time-Stamp
            </label>
            <p>{getDateTime(imageDetails.delivery_date)}</p>
          </div>

          <div>
            <label className="font-bold text-primary" htmlFor="project_url">
              Project URL
            </label>
            <div>
              <a href={imageDetails.url} className="cursor-pointer underline">
                View Link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
