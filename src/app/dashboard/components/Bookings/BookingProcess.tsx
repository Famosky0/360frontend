"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { createBookings } from "@/services/request";
import { profileSchema } from "../Interface";

// Icons
import { FaTimes } from "react-icons/fa";

// booking process - steps
import BookingProcessOne from "./StepOne";
import BookingProcessThree from "./StepThree";
import FinalStep from "./FinalStep";
import { bookingSchema, bankDetailsSchema } from "../Interface";
import Loader from "@/Loader/Loader";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import paymentId from "./paymentId";

const BookingProcess = ({
  setisStartBookingProcess,
  setRefresh,
  refresh,
}: {
  setisStartBookingProcess: Dispatch<SetStateAction<Boolean>>;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
}) => {
  const [bookingInfo, setBookingInfo] = useState<bookingSchema>({
    phone: "",
    plan: "JASPER",
    shoot_type: "OUTDOOR",
    location: "",
    number_of_shoot: 0,
    amount: "",
    shooting_date: new Date().getTime.toString(),
    shooting_time: "",
  });
  const [bookingSteps, setBookingSteps] = useState(1);
  const [valid, setValid] = useState(false);
  const [changing, setChanging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [txRef, setTxRef] = useState("");

  //  Profile details
  const [profile, setProfile] = useState<profileSchema>({
    first_name: "fetching...",
    last_name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (
      bookingInfo["phone"] &&
      bookingInfo["plan"] &&
      bookingInfo["shoot_type"] &&
      bookingInfo["number_of_shoot"] &&
      bookingInfo["shooting_date"] &&
      bookingInfo["shooting_time"]
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [bookingInfo, changing]);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("id: " + paymentId());
    if (!refreshToken) {
      console.log("unAuthorized");
      window.location.pathname = "/auth/login";
    }
  }, []);

  let config = {
    public_key: "FLWPUBK-1c88c255caed10702427055609023eb1-X",
    tx_ref: "",
    amount: parseInt(bookingInfo.amount),
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: profile.email,
      phone_number: bookingInfo.phone,
      name: profile.first_name + " " + profile.last_name,
    },
    customizations: {
      title: "360_SHOTITZ",
      description: "Payment to create bookings on Jasper",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const HandleBookingProcessSubmission = async () => {
    setChanging(!changing);
    let data = [];
    if (bookingSteps === 3) {
      if (valid) {
        setLoading(true);
        // TODO: CALL API TO MAKE BOOKINGS RATHER THAN CONSOLE LOGGING IT
        data = await createBookings(bookingInfo);
        console.log(bookingInfo);
        console.log(data);
        console.log(data.tx_ref);
        config.tx_ref = data.tx_ref;
        setLoading(false);
        setisStartBookingProcess(false);

        // MAKE FLUTTERWAVE PAYMENT
        if (config.tx_ref) {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
              setRefresh(!refresh);
            },
            onClose: () => {
              // END BOOKING PROCESS
              setisStartBookingProcess(false);
              setRefresh(!refresh);
            },
          });
        }
      }
    } else if (
      bookingSteps === 1 &&
      bookingInfo["phone"] &&
      bookingInfo["shooting_date"] &&
      bookingInfo["shooting_time"]
    ) {
      setBookingSteps(bookingSteps + 1);
    } else if (
      bookingSteps === 2 &&
      bookingInfo["shoot_type"] &&
      bookingInfo["number_of_shoot"] &&
      bookingInfo["amount"]
    ) {
      if (
        bookingInfo["shoot_type"].toLowerCase() === "outdoor" &&
        bookingInfo["location"]
      ) {
        setBookingSteps(bookingSteps + 1);
      } else if (bookingInfo["shoot_type"].toLowerCase() === "indoor") {
        setBookingSteps(bookingSteps + 1);
      }
    }
  };

  return (
    <div className="w-full min-h-[100vh] h-[100vh] overflow-y-scroll py-24 fixed top-0 left-0 right-0 bg-[black]/70 z-[9999999999] flex flex-col gap-6 justify-center items-center">
      <div className="relative bg-black w-[90%] md:w-[600px] rounded-lg p-3 min-h-[90dvh] px-4 md:px-10 py-6 pb-10 shadow-2xl flex gap-6 flex-col justify-start items-start">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full">
            {bookingSteps === 1 && (
              <BookingProcessOne
                setBookingInfo={setBookingInfo}
                bookingInfo={bookingInfo}
                profile={profile}
                setProfile={setProfile}
              />
            )}

            {bookingSteps === 2 && (
              <BookingProcessThree
                bookingInfo={bookingInfo}
                setBookingInfo={setBookingInfo}
              />
            )}
            {bookingSteps === 3 && (
              <FinalStep bookingInfo={bookingInfo} profile={profile} />
            )}

            <button
              className="w-full min-h-12 bg-primary rounded-md mt-6"
              onClick={HandleBookingProcessSubmission}
            >
              {bookingSteps === 1 && "Next"}
              {bookingSteps === 2 && "Next"}
              {loading
                ? bookingSteps === 3 && <Loader />
                : bookingSteps === 3 && "Make Payment"}
            </button>
          </div>
        </div>

        <div
          className="bg-[white] absolute -top-3 -right-2 rounded p-3 cursor-pointer flex gap-1 items-center justify-center"
          onClick={() => setisStartBookingProcess(false)}
        >
          <FaTimes className="text-2xl text-[#000000] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default BookingProcess;
