"use client";

import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const BookingCard = () => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Mock user data - replace with actual user context
  const user = {
    name: "Alex Johnson",
    role: "Soccer Club Member",
    avatar: "/default-avatar.jpg", // Replace with actual path
  };

  // Available fields
  const fields = [
    { id: "1", name: "Field A (North Wing)" },
    { id: "2", name: "Field B (South Wing)" },
  ];

  // Available time slots
  const timeSlots = [
    "9:00 AM",
    "11:00 AM",
    "1:00 PM",
    "3:00 PM",
    "5:00 PM",
    "7:00 PM",
  ];

  const handleBookingSubmit = () => {
    if (selectedField && selectedDate && selectedTime) {
      alert(`Booking confirmed for ${
        fields.find((f) => f.id === selectedField)?.name
      } 
on ${selectedDate.toDateString()} at ${selectedTime}`);
    }
  };

  return (
    <div className="booking-card-container">
      {/* Left Panel - User Profile & Booking Info */}
      <div className="booking-left-panel">
        <div className="user-profile">
          <img src={user.avatar} alt={user.name} className="user-avatar" />
          <h3>{user.name}</h3>
          <p>{user.role}</p>
        </div>

        <div className="booking-steps">
          <div className="step active">
            <span className="step-number">1</span>
            <span className="step-title">Select Field & Time</span>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <span className="step-title">Confirm Details</span>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <span className="step-title">Payment</span>
          </div>
        </div>

        <div className="field-selection">
          <label>Select Field:</label>
          <select
            value={selectedField || ""}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            <option value="">-- Select a field --</option>
            {fields.map((field) => (
              <option key={field.id} value={field.id}>
                {field.name}
              </option>
            ))}
          </select>
        </div>

        {selectedDate && (
          <div className="time-selection">
            <label>Select Time:</label>
            <div className="time-slots">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`time-slot ${
                    selectedTime === time ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Calendar */}
      <div className="booking-right-panel">
        <h2>Select Date</h2>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          fromDate={new Date()} // Disable past dates
          toDate={new Date(new Date().setMonth(new Date().getMonth() + 2))} // Limit to 2 months ahead
        />

        {selectedField && selectedDate && selectedTime && (
          <button className="confirm-button" onClick={handleBookingSubmit}>
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
