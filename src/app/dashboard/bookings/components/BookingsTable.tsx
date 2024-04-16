import React from "react";

// Icons
import { MdOutlinePending } from "react-icons/md";
import { fetchBookingSchema } from "../../components/Interface";

const BookingsTable = ({
  recentData,  
}: {
  recentData: any;  
}) => {
  return (
    <>
      <div className="overflow-y-auto h-[70vh] rounded-lg text-white shadow-md">
        <table className="w-full border-collapse bg-transparent text-left text-sm text-white">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Booking Date
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Booking Status
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Shooting Date
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Shooting Time
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Plan Type
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="w-full  border-gray-100 opacity-70 ">
            {recentData.length > 0
              ? recentData.map((item: fetchBookingSchema, i: any) => {
                  return (
                    <tr
                      className="w-full hover:bg-[white]/10 cursor-pointer"
                      key={i}
                    >
                      <td className="flex gap-3 px-6 py-4 font-normal">
                        <div className="text-sm">
                          <div className="font-medium">{item.created_at}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-auto rounded bg-[green] px-2 py-1 text-xs font-semibold text-white inline-flex items-center gap-1">
                          <MdOutlinePending />
                          {item.payment_status}
                        </div>
                      </td>
                      <td className="px-6 py-4">{item.delivery_status}</td>
                      <td className="px-6 py-4">{item.shooting_date}</td>
                      <td className="px-6 py-4">{item.shooting_time}</td>
                      <td className="px-6 py-4">{item.plan}</td>
                      <td className="px-6 py-4">{`₦ ${item.price}`}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingsTable;
