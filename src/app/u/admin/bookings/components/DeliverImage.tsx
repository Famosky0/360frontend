"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import FileBase64 from "react-file-base64";
import { deliverImages } from "@/services/adminRequest";
import Loader from "@/Loader/Loader";

// Icons
import { FaTimes } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";

// Ghost Image
import GhostImage from "../../../../../../public/ghost.jpeg";

// Define the type  element (HTMLInputElement)
type InputRefType = HTMLInputElement;

const DeliverImage = ({
  bookingId,
  setisDelivering,
}: {
  bookingId: any;
  setisDelivering: Dispatch<SetStateAction<Boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  //  Profile details
  const [deliveries, setDeliveries] = useState<any>({
    project_name: "",
    cover_image: "",
    url: "",
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
      setDeliveries({ ...deliveries, cover_image: base64 });
      // Call API to upload image to database
    }
    console.log(base64);
  };

  const HandleDelivery = async (e: any) => {
    e.preventDefault();
    // TODO: CALL API TO Deliver Image
    if (deliveries.project_name && deliveries.cover_image && deliveries.url) {
      console.log(deliveries);
      setLoading(true);
      await deliverImages(
        {
          project_name: deliveries.project_name,
          cover_image: deliveries.cover_image.file,
          url: deliveries.url,
        },
        bookingId
      );
      setLoading(false);
      // setisDelivering(false)
    }
  };

  const dateString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    // Construct the date string in the desired format (YYYY-MM-DD HH:MM:SS)
    const DateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return DateString;
  };

  const getDateTime = (dateString: string) => {
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
    <div className="w-full min-h-[100vh] h-[100vh] overflow-y-scroll py-24 fixed top-0 left-0 right-0 bg-[black]/70 z-[9999999999] flex flex-col gap-6 justify-center items-center">
      <div className="relative bg-black w-[90%] md:w-[600px] rounded-lg p-3 min-h-[90dvh] px-4 md:px-10 py-6 pb-10 shadow-2xl flex gap-6 flex-col justify-start items-start">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full">
            <div>
              <form
                className="flex flex-col gap-5 mt-8"
                onSubmit={HandleDelivery}
              >
                <div className="w-full flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-primary">
                    Cover Image
                  </h2>

                  <div className="flex">
                    <div
                      onClick={UploadFileHandler}
                      className="relative w-auto"
                    >
                      <div className="relative flex flex-col">
                        {deliveries.cover_image ? (
                          <div className="relative w-auto transition-all rounded flex items-center justify-center">
                            <Image
                              src={deliveries.cover_image.base64}
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
                                deliveries["cover_image"]
                                  ? deliveries.cover_image
                                  : GhostImage
                              }
                              multiple={false}
                              onDone={(base64: any) => {
                                OnChangeUploadFile(base64);
                              }}
                            />
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">
                    Deliver Image
                  </h2>
                </div>
                <div>
                  <label htmlFor="project_name">Project Name</label>
                  <input
                    type="text"
                    id="project_name"
                    name="project_name"
                    value={deliveries["project_name"]}
                    onChange={(e) => {
                      setDeliveries({
                        ...deliveries,
                        project_name: e.target.value,
                      });
                    }}
                    placeholder="Ajani Born Dara"
                    className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
                  />
                </div>
                <div>
                  <label htmlFor="date_and_time">Time-Stamp</label>
                  <input
                    type="text"
                    id="text"
                    name="date_and_time"
                    value={getDateTime(dateString())}
                    placeholder={getDateTime(dateString())}
                    disabled
                    className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
                  />
                </div>

                <div>
                  <label htmlFor="project_url">Project URL</label>
                  <input
                    type="url"
                    id="project_url"
                    name="url"
                    value={deliveries["url"]}
                    onChange={(e: any) => {
                      setDeliveries({
                        ...deliveries,
                        url: e.target.value,
                      });
                    }}
                    placeholder="Link to the work"
                    className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
                  />
                </div>
                <button
                  className="w-full min-h-12 bg-primary rounded-md"
                  type="submit"
                >
                  {loading ? <Loader /> : "Deliver Image"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div
          className="bg-[white] absolute -top-3 -right-2 rounded p-3 cursor-pointer flex gap-1 items-center justify-center"
          onClick={() => setisDelivering(false)}
        >
          <FaTimes className="text-2xl text-[#000000] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default DeliverImage;
