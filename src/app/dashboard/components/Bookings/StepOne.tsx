import React from 'react';

const BookingProcessOne = ({ setBookingInfo, bookingInfo, profile }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl text-primary">Create Bookings</h1>
      </div>
      <form className="flex flex-col gap-5 mt-8">
        <div>
          <label htmlFor="Phone_number">Your WhatsApp Number</label>
          <input
            type="text"
            id="Phone_number"
            name="phone"
            value={bookingInfo.phone}
            onChange={handleChange}
            placeholder="08036399878"
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="shooting_date"
            value={bookingInfo.shooting_date}
            onChange={handleChange}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="time">Time (when are you shooting?)</label>
          <input
            type="time"
            id="time"
            name="shooting_time"
            value={bookingInfo.shooting_time}
            onChange={handleChange}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
      </form>
    </div>
  );
};

export default BookingProcessOne;
