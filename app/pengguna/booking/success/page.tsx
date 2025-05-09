"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircleIcon } from "@heroicons/react/24/outline"

interface User {
  id: string
  name: string
  email: string
  phone: string
}

interface Booking {
  id: string
  field: {
    id: string
    name: string
    location: string
  }
  date: string
  time: string
  user: User
  status: string
  createdAt: string
  paymentProof?: string
}

export default function BookingSuccessPage() {
  const [user, setUser] = useState<User | null>(null)
  const [booking, setBooking] = useState<Booking | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/auth/login")
      return
    }

    setUser(JSON.parse(storedUser))

    // Get the latest booking
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    if (bookings.length > 0) {
      setBooking(bookings[bookings.length - 1])
    } else {
      router.push("/pengguna/booking")
    }
  }, [router])

  if (!user || !booking) {
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
              <h1 className="text-2xl font-bold text-red-600">bells</h1>
              <p className="text-gray-600">Borneo Anfield Loyalty System</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircleIcon className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
            <p className="text-gray-600 mb-6">Your booking has been confirmed and is waiting for approval.</p>

            <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">Booking Details</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <p className="text-gray-500">Booking ID:</p>
                    <p className="font-medium">{booking.id}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Field:</p>
                    <p className="font-medium">
                      {booking.field.name} ({booking.field.location})
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Date:</p>
                    <p className="font-medium">
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Time:</p>
                    <p className="font-medium">{booking.time}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Status:</p>
                    <p className="font-medium text-yellow-600">Waiting for approval</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">Payment Information</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <p className="text-gray-500">Payment Status:</p>
                    <p className="font-medium text-green-600">Paid</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Payment Proof:</p>
                    <p className="font-medium">{booking.paymentProof || "Uploaded"}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Loyalty Points</h3>
                <div className="bg-red-50 text-red-700 p-3 rounded-lg">
                  <p className="font-medium">+5 points added to your account!</p>
                  <p className="text-sm">Current balance: {user.points} points</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link href="/pengguna" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Back to Dashboard
            </Link>
            <Link href="/pengguna/booking" className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Book Another Field
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
