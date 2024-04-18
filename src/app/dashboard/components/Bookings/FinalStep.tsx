import React from "react";
import { bookingSchema, profileSchema } from "../Interface";

const FinalStep = ({
  bookingInfo,
  profile,
}: {
  bookingInfo: bookingSchema;
  profile: profileSchema;
}) => {
  const PaymentDetails = [
    {
      title: "Bank Name",
      value: profile.first_name + " " + profile.last_name,
    },
    {
      title: "Plan",
      value: bookingInfo.plan,
    },
    {
      title: "Shoot Type",
      value: bookingInfo.shoot_type,
    },
    {
      title: "Number of shoot",
      value: bookingInfo.number_of_shoot,
    },
    {
      title: "Amount",
      value: `# ${bookingInfo.amount}`,
    },
    {
      title: "WhatsApp Number",
      value: bookingInfo.phone,
    },
    {
      title: "Location",
      value: bookingInfo.location,
    },
    {
      title: "Shooting Date",
      value: bookingInfo.shooting_date,
    },
    {
      title: "Shooting Time",
      value: bookingInfo.shooting_time,
    },
  ];

  return (
    <div className="w-full flex flex-col justify-between gap-12">
      <div className="w-full flex flex-col gap-4 text-white font-light">
        <p className="text-lg text-primary font-bold">Payment Details</p>
        {PaymentDetails.map((detail, index) =>
          detail.title === "Location" && !detail.value ? null : (
            <>
              <div key={index} className="flex gap-1 text-lg">
                <p className="font-bold">{detail.title}:</p>
                <p>{detail.value}</p>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default FinalStep;
