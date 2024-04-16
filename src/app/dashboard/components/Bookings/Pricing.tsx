import React from "react";

// Components
import WhiteSpace from "@/components/WhiteSpace";
import { planSchema, bookingSchema } from "../Interface";

// Pattern
import Wavy_pattern from "../../../../../public/wavy_pattern.png";

const Pricing = ({
  setBookingInfo,
  bookingInfo,
  pricingPlan,
}: {
  setBookingInfo: React.Dispatch<React.SetStateAction<bookingSchema>>;
  bookingInfo: bookingSchema;
  pricingPlan: any;
}) => {
  return (
    <div
      className="md:py-12"
      style={{
        background: `url(${Wavy_pattern.src}) 100px no-repeat, url(${Wavy_pattern.src}) 100px no-repeat`,
        backgroundPosition: "left top, bottom right",
        backgroundSize: "400px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <WhiteSpace>
        <div className="w-full flex flex-col gap-12">
          <div className="w-full md:max-w-4xl max-w-3xl mx-auto grid gap-x-12 gap-y-6 md:grid-cols-3 grid-cols-1 justify-center items-center">
            {pricingPlan.map((plan: any, index: any) => {
              return (
                <PricingCard
                  {...plan}
                  key={index}
                  bookingInfo={bookingInfo}
                  setBookingInfo={setBookingInfo}
                />
              );
            })}
          </div>
        </div>
      </WhiteSpace>
    </div>
  );
};

const PricingCard: React.FC<any> = ({
  name,
  price,
  desc,
  bookingInfo,
  setBookingInfo,
}: {
  name: any;
  price: any;
  desc: any;
  bookingInfo: bookingSchema;
  setBookingInfo: any;
}) => {
  return (
    <div
      className={`max-w-full w-full border border-[#BFBFBF] ${
        bookingInfo.plan === name ? "border-primary" : "border-[#BFBFBF]"
      } min-h-[400px] rounded-xl p-4 flex flex-col gap-6 justify-center items-center cursor-pointer`}
      onClick={() => {
        setBookingInfo({ ...bookingInfo, plan: name });
      }}
    >
      <div>
        <h1 className="text-2xl font-normal">{name}</h1>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">₦{price}</h2>
      </div>
      <div>
        <ul className="text-center flex flex-col gap-2 font-light">
          <p>{desc}</p>
        </ul>
      </div>
      <div>
        <button className="h-10 w-32 mt-6 shadow inline-flex bg-[var(--primary-color)] hover:text-main justify-center items-center gap-2 rounded-full font-medium text-white align-middle transition-all text-md">
          Book here
        </button>
      </div>
    </div>
  );
};

export default Pricing;
