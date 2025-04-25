"use client";

import { useState } from "react";

export default function BookingPage() {
  const [selectedField, setSelectedField] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(1);

  const fields = [
    { id: 1, name: "Field A" },
    { id: 2, name: "Field B" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Booking submitted for Field ${selectedField} on ${date} at ${time} for ${duration} hour(s)`
    );
  };

  return (
    <div className="booking-container">
      <h1>Book a Field</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>Select Field:</label>
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            required
          >
            <option value="">-- Select a field --</option>
            {fields.map((field) => (
              <option key={field.id} value={field.id}>
                {field.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Duration (hours):</label>
          <input
            type="number"
            min="1"
            max="3"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
