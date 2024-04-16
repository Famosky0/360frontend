import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const BookingsTable = ({ allBookings }: { allBookings: any }) => {
  const router = useRouter();
  return (
    <>
      <div className="overflow-y-auto h-[70vh] rounded-lg text-white shadow-md">
        <table className="w-full border-collapse bg-transparent text-left text-sm text-white">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Picture Delivererd
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Shooting Date
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Plan Type
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-lg">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="w-full border-gray-100 opacity-70 ">
            {allBookings?.map((item: any, index: any) => {
              return (
                <tr
                  className="w-full hover:bg-[white]/10 cursor-pointer"
                  key={index}
                  onClick={() => {
                    router.push(`/u/admin/bookings/${item?.id}`);
                  }}
                >
                  <td className="flex gap-3 px-6 py-4 font-normal">
                    <div className="text-sm">
                      <h2 className="font-medium">{item?.name}</h2>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <h2 className="font-medium">08138395869</h2>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item?.number_of_shoot}</td>
                  <td className="px-6 py-4">{item?.payment_status}</td>
                  <td className="px-6 py-4">{item?.shooting_date}</td>
                  <td className="px-6 py-4">{item?.plan}</td>
                  <td className="px-6 py-4">₦{item?.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingsTable;
