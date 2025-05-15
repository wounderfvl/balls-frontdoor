import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FieldBooking } from "@/types";

interface BookingTableProps {
  bookings: FieldBooking[];
  onEdit: (booking: FieldBooking) => void;
  onDelete: (id: string) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  onEdit,
  onDelete,
}) => {
  const [entries, setEntries] = useState(5);
  const [search, setSearch] = useState("");

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.phone.includes(search) ||
      booking.customer.toLowerCase().includes(search.toLowerCase()) ||
      booking.field.toLowerCase().includes(search.toLowerCase())
  );

  const StatusBadge = ({
    status,
  }: {
    status: "Delivered" | "Process" | "Cancelled";
  }) => {
    const colorClasses = {
      Delivered: "bg-green-100 text-green-800",
      Process: "bg-yellow-100 text-yellow-800",
      Cancelled: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Show</span>
          <select
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-500">entries</span>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-3 py-1 pl-8 text-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                No. Tlp
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Field
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Customer
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Amount
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Payment Mode
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.slice(0, entries).map((booking) => (
              <tr key={booking.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{booking.phone}</td>
                <td className="px-4 py-3 text-sm">{booking.field}</td>
                <td className="px-4 py-3 text-sm">{booking.customer}</td>
                <td className="px-4 py-3 text-sm">{booking.date}</td>
                <td className="px-4 py-3 text-sm">{booking.amount}</td>
                <td className="px-4 py-3 text-sm">{booking.paymentMode}</td>
                <td className="px-4 py-3 text-sm">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(booking)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(booking.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
