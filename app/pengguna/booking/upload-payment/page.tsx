"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
}

export default function UploadPaymentPage() {
  const [user, setUser] = useState<User | null>(null)
  const [booking, setBooking] = useState<Booking | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file && booking) {
      setIsUploaded(true)

      // In a real app, this would upload the file to a server
      // For demo purposes, we'll just update the booking status in localStorage
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
      const updatedBookings = bookings.map((b: Booking) => {
        if (b.id === booking.id) {
          return { ...b, status: "confirmed", paymentProof: file.name }
        }
        return b
      })

      localStorage.setItem("bookings", JSON.stringify(updatedBookings))

      // Add points for the booking
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
      storedUser.points = (storedUser.points || 0) + 5 // Add 5 points for booking
      localStorage.setItem("user", JSON.stringify(storedUser))

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/pengguna/booking/success")
      }, 2000)
    }
  }

  if (!user || !booking) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-8">
        <div className="w-full">
          <div className="flex items-center mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-red-600">bells</h1>
              <p className="text-gray-600">Borneo Anfield Loyalty System</p>
            </div>
          </div>

          <div className="mb-4">
            <Link href="/pengguna/booking" className="flex items-center text-red-600 hover:text-red-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Booking
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Upload Bukti Pembayaran</h2>

            {isUploaded ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                <p className="font-medium">Payment proof uploaded successfully!</p>
                <p className="text-sm">Redirecting to confirmation page...</p>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-12 ${
                  isDragging ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>

                  {file ? (
                    <div className="text-center">
                      <p className="font-medium mb-2">{file.name}</p>
                      <p className="text-sm text-gray-500 mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      <button
                        onClick={handleUpload}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Submit Payment Proof
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-lg font-medium mb-2">Browse</p>
                      <p className="text-gray-500 mb-4">or drag a file here</p>
                      <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                      <label
                        htmlFor="file-upload"
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                      >
                        Select File
                      </label>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Link href="/pengguna/booking" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Back to Booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
