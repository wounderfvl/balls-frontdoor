"use client";

import { useState } from "react";
import BookingTable from "@/components/dashboard/booking-table";
import BookingForm from "@/components/dashboard/booking-form";
import { initialBookings } from "@/data/bookings";
import { FieldBooking } from "@/types";
import { FaPlus } from "react-icons/fa";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<FieldBooking[]>(initialBookings);
  const [showForm, setShowForm] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<
    FieldBooking | undefined
  >(undefined);

  const handleAddNew = () => {
    setCurrentBooking(undefined);
    setShowForm(true);
  };

  const handleEdit = (booking: FieldBooking) => {
    setCurrentBooking(booking);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter((booking) => booking.id !== id));
    }
  };

  const handleSave = (booking: FieldBooking) => {
    if (currentBooking) {
      // Edit existing booking
      setBookings(bookings.map((b) => (b.id === booking.id ? booking : b)));
    } else {
      // Add new booking
      setBookings([...bookings, booking]);
    }
    setShowForm(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Pemesanan Lapangan</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <FaPlus size={12} />
          <span>Add Customer</span>
        </button>
      </div>

      {showForm ? (
        <BookingForm
          booking={currentBooking}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <BookingTable
          bookings={bookings}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
