"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Simple validation
    if (!email) {
      setError("Please enter your email address")
      return
    }

    // Mock password reset - in a real app, this would be an API call
    // For demo purposes, we'll just show a success message
    setSuccess(true)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Background Image - Left Side on larger screens, full background on mobile */}
      <div className="relative w-full md:w-1/2 h-screen">
        <Image src="/BASland.jpg?height=1080&width=1920" alt="Stadium Background" fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">INDONESIA</h1>
          <h2 className="text-3xl font-semibold mb-8">MAKE US DREAM</h2>
          <p className="text-xl mt-auto">KEEPING THE GAME BEAUTIFUL</p>
        </div>
      </div>

      {/* Forgot Password Form - Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-red-600 mb-2">BALLS</h1>
            <p className="text-gray-600">Borneo Anfield Loyalty System</p>
          </div>

          <h2 className="text-2xl font-bold mb-2">Forgot Password</h2>
          <p className="text-gray-600 mb-8">Enter your email to reset your password</p>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          {success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <p>Password reset instructions have been sent to your email.</p>
              <div className="mt-6 text-center">
                <Link href="/auth/login" className="text-red-600 hover:underline">
                  Return to login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Reset Password
              </button>

              <div className="mt-6 text-center">
                <Link href="/auth/login" className="text-red-600 hover:underline">
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
