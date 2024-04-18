// Assuming Pricing Component is simplified or removed entirely based on the new requirements
const BookingProcessTwo = ({
  setBookingInfo,
  bookingInfo,
}: {
  setBookingInfo: React.Dispatch<React.SetStateAction<bookingSchema>>;
  bookingInfo: bookingSchema;
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl text-primary">Confirm Booking Details</h1>
      </div>
      {/* Summary or confirmation of the booking details */}
      <div className="text-white p-4">
        <p><strong>Shoot Type:</strong> {bookingInfo.shoot_type}</p>
        <p><strong>Date:</strong> {bookingInfo.shooting_date}</p>
        <p><strong>Time:</strong> {bookingInfo.shooting_time}</p>
        <p><strong>Location:</strong> {bookingInfo.location}</p>
      </div>
    </div>
  );
};

export default BookingProcessTwo;
