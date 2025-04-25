"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BookingForm({ fields }: { fields: any[] }) {
  const router = useRouter();
  const [selectedField, setSelectedField] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBooking({ fieldId: selectedField, date, time, duration });
    router.push("/dashboard");
  };

  return (
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
              {field.name} ({field.location})
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
          min={new Date().toISOString().split("T")[0]}
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
  );
}
