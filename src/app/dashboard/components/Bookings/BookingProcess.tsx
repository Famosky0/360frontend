"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { createBookings } from "@/services/request";
import { bookingSchema, profileSchema } from "../Interface";
import BookingProcessOne from "./StepOne";
import BookingProcessThree from "./StepThree";
import FinalStep from "./FinalStep";
import Loader from "@/Loader/Loader";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { FaTimes } from "react-icons/fa"; // Importing FaTimes here

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
    shoot_type: "OUTDOOR",
    location: "",
    number_of_shoot: 0,
    amount: "",
    shooting_date: new Date().toISOString().slice(0, 10), // Updated for correct format
    shooting_time: "",
  });
  const [bookingSteps, setBookingSteps] = useState(1);
  const [loading, setLoading] = useState(false);

  let config = {
    public_key: "FLWPUBK-1c88c255caed10702427055609023eb1-X",
    tx_ref: Date.now().toString(),  // Unique reference for each transaction
    amount: parseFloat(bookingInfo.amount),
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: profile.email,
      phone_number: bookingInfo.phone,
      name: profile.first_name + " " + profile.last_name,
    },
    customizations: {
      title: "360_SHOTITZ",
      description: "Payment for Booking",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const HandleBookingProcessSubmission = async () => {
    if (bookingSteps === 3 && bookingInfo.amount > 0) {
      setLoading(true);
      try {
        const data = await createBookings(bookingInfo);
        if (data) {
          handleFlutterPayment({
            callback: (response) => {
              closePaymentModal();
              setRefresh(!refresh);
              setisStartBookingProcess(false);
            },
            onClose: () => {
              setisStartBookingProcess(false);
              setRefresh(!refresh);
            },
          });
        }
      } finally {
        setLoading(false);
      }
    } else {
      setBookingSteps(currentStep => currentStep + 1);
    }
  };

  return (
    <div className="w-full min-h-[100vh] overflow-y-scroll py-24 fixed top-0 left-0 right-0 bg-[black]/70 z-[9999999999] flex flex-col gap-6 justify-center items-center">
      <div className="relative bg-black w-[90%] md:w-[600px] rounded-lg p-3 min-h-[90vh] px-4 md:px-10 py-6 pb-10 shadow-2xl flex flex-col gap-6 justify-start items-start">
        <div className="w-full flex flex-col gap-2">
          {bookingSteps === 1 && <BookingProcessOne setBookingInfo={setBookingInfo} bookingInfo={bookingInfo} />}
          {bookingSteps === 2 && <BookingProcessThree bookingInfo={bookingInfo} setBookingInfo={setBookingInfo} />}
          {bookingSteps === 3 && <FinalStep bookingInfo={bookingInfo} />}
          <button className="w-full min-h-12 bg-primary rounded-md mt-6" onClick={HandleBookingProcessSubmission}>
            {loading ? <Loader /> : bookingSteps === 3 ? "Make Payment" : "Next"}
          </button>
        </div>
        <div className="bg-white absolute -top-3 -right-2 rounded p-3 cursor-pointer" onClick={() => setisStartBookingProcess(false)}>
          <FaTimes className="text-2xl text-black" />
        </div>
      </div>
    </div>
  );
};

export default BookingProcess;

