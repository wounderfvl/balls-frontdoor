"use client";

import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Player {
  name: string;
  email: string;
  phone: string;
}

const BookingCard = () => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 555-123-4567",
  });
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState<Player>({
    name: "",
    email: "",
    phone: "",
  });

  const fields = [
    { id: "1", name: "Field A (North Wing)" },
    { id: "2", name: "Field B (South Wing)" },
  ];

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
      setStep(2);
    } else {
      alert("Please select a field, date, and time before proceeding.");
    }
  };

  const handleConfirmDetails = () => {
    setStep(3);
  };

  const handlePaymentSubmit = () => {
    alert("Payment successful! Your booking is confirmed.");
    setSelectedField(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setPlayers([]);
    setStep(1);
  };

  const handleAddPlayer = () => {
    if (newPlayer.name || newPlayer.email) {
      setPlayers([...players, newPlayer]);
      setNewPlayer({ name: "", email: "", phone: "" });
    } else {
      alert("Please enter a valid username or email.");
    }
  };

  const handleRemovePlayer = (index: number) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  return (
    <div className="booking-card-container">
      {step === 1 && (
        <>
          {/* Step 1: Booking */}
          <div className="booking-left-panel">
            <div className="user-profile">
              <h3>{userDetails.name}</h3>
              <p>{userDetails.email}</p>
              <p>{userDetails.phone}</p>
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

          <div className="booking-right-panel">
            <h2>Select Date</h2>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              fromDate={new Date()}
              toDate={new Date(new Date().setMonth(new Date().getMonth() + 2))}
            />

            {selectedField && selectedDate && selectedTime && (
              <button className="confirm-button" onClick={handleBookingSubmit}>
                Confirm Booking
              </button>
            )}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          {/* Step 2: Confirm Details */}
          <div className="booking-left-panel">
            <div className="user-profile">
              <h3>{userDetails.name}</h3>
              <p>{userDetails.email}</p>
              <p>{userDetails.phone}</p>
            </div>

            <div className="booking-steps">
              <div className="step">
                <span className="step-number">1</span>
                <span className="step-title">Select Field & Time</span>
              </div>
              <div className="step active">
                <span className="step-number">2</span>
                <span className="step-title">Confirm Details</span>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <span className="step-title">Payment</span>
              </div>
            </div>
          </div>

          <div className="booking-right-panel">
            <h2>Confirm Your Booking</h2>

            <div className="booking-summary">
              <h3>Booking Details</h3>
              <p>
                <strong>Field:</strong>{" "}
                {fields.find((f) => f.id === selectedField)?.name}
              </p>
              <p>
                <strong>Date:</strong> {selectedDate?.toDateString()}
              </p>
              <p>
                <strong>Time:</strong> {selectedTime}
              </p>
            </div>

            <div className="user-details">
              <h3>Your Information</h3>
              <p>
                <strong>Name:</strong> {userDetails.name}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                <strong>Phone:</strong> {userDetails.phone}
              </p>
            </div>

            <div className="players-section">
              <h3>Additional Players</h3>

              {players.length > 0 ? (
                <div className="players-list">
                  {players.map((player, index) => (
                    <div key={index} className="player-card">
                      <p>
                        <strong>Name:</strong> {player.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {player.email}
                      </p>
                      {player.phone && (
                        <p>
                          <strong>Phone:</strong> {player.phone}
                        </p>
                      )}
                      <button
                        onClick={() => handleRemovePlayer(index)}
                        className="remove-player"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No additional players added yet</p>
              )}

              <div className="add-player-form">
                <h4>Add Another Player</h4>
                <div className="form-group">
                  <label>Username or Email:</label>
                  <input
                    type="text"
                    value={newPlayer.name} // Using `name` to store either username or email
                    onChange={(e) =>
                      setNewPlayer({
                        ...newPlayer,
                        name: e.target.value,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter username or email"
                    required
                  />
                </div>
                <button
                  onClick={handleAddPlayer}
                  disabled={!newPlayer.name}
                  className="add-player-button"
                >
                  Add Player
                </button>
              </div>
            </div>

            <button className="confirm-button" onClick={handleConfirmDetails}>
              Proceed to Payment
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          {/* Step 3: Payment */}
          <div className="booking-left-panel">
            <div className="user-profile">
              <h3>{userDetails.name}</h3>
              <p>{userDetails.email}</p>
              <p>{userDetails.phone}</p>
            </div>

            <div className="booking-steps">
              <div className="step">
                <span className="step-number">1</span>
                <span className="step-title">Select Field & Time</span>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <span className="step-title">Confirm Details</span>
              </div>
              <div className="step active">
                <span className="step-number">3</span>
                <span className="step-title">Payment</span>
              </div>
            </div>
          </div>

          <div className="booking-right-panel">
            <h2>Proceed Payment</h2>

            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <p>
                <strong>Field:</strong>{" "}
                {fields.find((f) => f.id === selectedField)?.name}
              </p>
              <p>
                <strong>Date:</strong> {selectedDate?.toDateString()}
              </p>
              <p>
                <strong>Time:</strong> {selectedTime}
              </p>
              <p className="total-amount">
                <strong>Total:</strong> $50.00
              </p>
            </div>

            <div className="payment-method">
              <label>Payment Method:</label>
              <select>
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>
            </div>

            <div className="credit-card-form">
              <div className="form-group">
                <label>Card Number:</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date:</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label>CVV:</label>
                  <input type="text" placeholder="123" />
                </div>
              </div>
              <div className="form-group">
                <label>Cardholder Name:</label>
                <input type="text" placeholder="John Doe" />
              </div>
            </div>

            <button className="confirm-button" onClick={handlePaymentSubmit}>
              Confirm Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingCard;
