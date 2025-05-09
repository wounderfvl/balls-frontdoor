"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface User {
  id: string
  name: string
  email: string
  phone: string
}

interface Field {
  id: string
  name: string
  location: string
}

const timeSlots = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"]

const fields: Field[] = [
  { id: "1", name: "Field A", location: "North Wing" },
  { id: "2", name: "Field B", location: "South Wing" },
  { id: "3", name: "Field C", location: "East Wing" },
]

export default function BookingPage() {
  const [user, setUser] = useState<User | null>(null)
  const [step, setStep] = useState(1)
  const [selectedField, setSelectedField] = useState<Field | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/auth/login")
      return
    }

    setUser(JSON.parse(storedUser))

    // Get existing bookings
    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    setBookings(existingBookings)
  }, [router])

  const handleFieldSelect = (field: Field) => {
    setSelectedField(field)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setCurrentMonth(nextMonth)
  }

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth)
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    setCurrentMonth(prevMonth)
  }

  const handleConfirmBooking = () => {
    if (selectedField && selectedTime && selectedDate) {
      // Check if the selected time slot is already booked
      if (isTimeSlotBooked(selectedTime)) {
        alert("This time slot is already booked. Please select another time.")
        return
      }
      setStep(2)
    }
  }

  const handleProceedToPayment = () => {
    setStep(3)
  }

  const handleConfirmPayment = () => {
    // In a real app, this would process the payment
    // For demo purposes, we'll just save the booking to localStorage

    const booking = {
      id: Math.random().toString(36).substring(2, 9),
      field: selectedField,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      user: user,
      status: "pending",
      createdAt: new Date(),
    }

    // Get existing bookings or initialize empty array
    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    existingBookings.push(booking)
    localStorage.setItem("bookings", JSON.stringify(existingBookings))

    // Redirect to upload payment proof
    router.push("/pengguna/booking/upload-payment")
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    // Get day of week for first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()

    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek

    // Calculate total days to show (max 42 for 6 weeks)
    const totalDays = 42

    // Generate array of dates
    const dates = []

    // Add days from previous month
    const prevMonth = new Date(year, month, 0)
    const prevMonthDays = prevMonth.getDate()

    for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
      dates.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false,
        isToday: false,
      })
    }

    // Add days from current month
    const today = new Date()
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      dates.push({
        date,
        isCurrentMonth: true,
        isToday:
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear(),
      })
    }

    // Add days from next month
    const remainingDays = totalDays - dates.length
    for (let i = 1; i <= remainingDays; i++) {
      dates.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false,
      })
    }

    return dates
  }

  const calendarDays = generateCalendarDays()
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const isTimeSlotBooked = (time: string) => {
    if (!selectedDate) return false

    const dateStr = selectedDate.toISOString().split("T")[0]
    return bookings.some(
      (booking) =>
        booking.date === dateStr &&
        booking.time === time &&
        booking.field.id === selectedField?.id &&
        booking.status !== "cancelled",
    )
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-8">
        <div className="w-full">
          <div className="mb-4">
            <Link href="/pengguna" className="flex items-center text-red-600 hover:text-red-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-red-600">BALLS</h1>
              <p className="text-gray-600">Borneo Anfield Loyalty System</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-500">{user.phone || "+1555-123-4567"}</p>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex items-center mb-8">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-red-600 text-white" : "bg-gray-200"} mr-2`}
            >
              1
            </div>
            <div className={`text-sm ${step >= 1 ? "text-red-600 font-medium" : "text-gray-500"} mr-4`}>
              Select Field & Time
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div className={`h-full ${step >= 2 ? "bg-red-600" : "bg-gray-200"}`}></div>
            </div>

            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-red-600 text-white" : "bg-gray-200"} mr-2`}
            >
              2
            </div>
            <div className={`text-sm ${step >= 2 ? "text-red-600 font-medium" : "text-gray-500"} mr-4`}>
              Confirm Details
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div className={`h-full ${step >= 3 ? "bg-red-600" : "bg-gray-200"}`}></div>
            </div>

            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-red-600 text-white" : "bg-gray-200"} mr-2`}
            >
              3
            </div>
            <div className={`text-sm ${step >= 3 ? "text-red-600 font-medium" : "text-gray-500"}`}>Payment</div>
          </div>

          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              {showHistory ? "Hide Booking History" : "Show Booking History"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ml-1 transform transition-transform ${showHistory ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {showHistory && (
            <div className="mb-8 bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-bold mb-4">Booking History</h2>
              {bookings.length === 0 ? (
                <p className="text-gray-500">No bookings found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Field
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.field.name} ({booking.field.location})
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(booking.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{booking.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : booking.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Select Field & Time */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Select Field:</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedField?.id === field.id
                          ? "border-red-600 bg-red-50"
                          : "border-gray-200 hover:border-red-300"
                      }`}
                      onClick={() => handleFieldSelect(field)}
                    >
                      <h3 className="font-medium">{field.name}</h3>
                      <p className="text-sm text-gray-500">{field.location}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Select Time:</label>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  {timeSlots.map((time) => {
                    const isBooked = isTimeSlotBooked(time)
                    return (
                      <div
                        key={time}
                        className={`border rounded-lg p-3 text-center transition-colors ${
                          selectedTime === time
                            ? "border-red-600 bg-red-50 text-red-600"
                            : isBooked
                              ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "border-gray-200 hover:border-red-300 cursor-pointer"
                        }`}
                        onClick={() => !isBooked && handleTimeSelect(time)}
                      >
                        {time}
                        {isBooked && <div className="text-xs text-red-500">Booked</div>}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Select Date</label>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={handlePrevMonth} className="text-gray-600 hover:text-red-600">
                      &lt;
                    </button>
                    <h3 className="font-medium">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button onClick={handleNextMonth} className="text-gray-600 hover:text-red-600">
                      &gt;
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {dayNames.map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-600 py-1">
                        {day}
                      </div>
                    ))}

                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className={`text-center py-2 rounded-md cursor-pointer ${
                          day.isCurrentMonth ? "hover:bg-red-50" : "text-gray-400"
                        } ${
                          selectedDate &&
                          selectedDate.getDate() === day.date.getDate() &&
                          selectedDate.getMonth() === day.date.getMonth() &&
                          selectedDate.getFullYear() === day.date.getFullYear()
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : ""
                        } ${day.isToday ? "border border-red-600" : ""}`}
                        onClick={() => day.isCurrentMonth && handleDateSelect(day.date)}
                      >
                        {day.date.getDate()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <button
                  onClick={handleConfirmBooking}
                  disabled={!selectedField || !selectedTime || !selectedDate || isTimeSlotBooked(selectedTime)}
                  className={`px-6 py-2 rounded-lg ${
                    selectedField && selectedTime && selectedDate && !isTimeSlotBooked(selectedTime)
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Confirm Details */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-6">Confirm Your Booking</h2>

              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Booking Details</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Field:</p>
                      <p className="font-medium">
                        {selectedField?.name} ({selectedField?.location})
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date:</p>
                      <p className="font-medium">
                        {selectedDate?.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time:</p>
                      <p className="font-medium">{selectedTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Your Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name:</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email:</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone:</p>
                      <p className="font-medium">{user.phone || "+1 555-123-4567"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Additional Players</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500 mb-4">No additional players added yet</p>

                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      placeholder="Enter username or email"
                      className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button className="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700">
                      Add Player
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleProceedToPayment}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-6">Proceed Payment</h2>

              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Booking Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Field:</p>
                      <p className="font-medium">
                        {selectedField?.name} ({selectedField?.location})
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date:</p>
                      <p className="font-medium">
                        {selectedDate?.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time:</p>
                      <p className="font-medium">{selectedTime}</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <p className="font-medium">Total:</p>
                      <p className="font-bold">$50.00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Payment Method:</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                  <option>E-Wallet</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Card Number:</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Expiry Date:</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Cardholder Name:</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmPayment}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
