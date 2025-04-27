"use client";
import BookingCard from "../../components/BookingCard";

export default function BookingPage() {
  return (
    <div className="bg-image">
      <div className="booking-page-container">
        {/* Page Title */}
        <h1 className="booking-title">Borneo Anfield Stadium</h1>

        {/* Booking Content */}
        <div className="booking-content">
          <BookingCard />
        </div>
      </div>

      <style jsx>{`
        body {
          color: green;
        }
      `}</style>
    </div>
  );
}
