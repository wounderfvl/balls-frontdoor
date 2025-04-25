"use client";
import BookingCard from "../../components/BookingCard";

export default function BookingPage() {
  return (
    <div className="booking-page-container">
      <h1 className="booking-title">Book Your Soccer Field</h1>
      <div className="booking-content">
        <BookingCard />
      </div>
    </div>
  );
}
