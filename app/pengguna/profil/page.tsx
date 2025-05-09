"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

interface User {
  id: string
  name: string
  email: string
  phone: string
  points: number
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/auth/login")
      return
    }

    const parsedUser = JSON.parse(storedUser)
    setUser(parsedUser)
    setName(parsedUser.name)
    setEmail(parsedUser.email)
    setPhone(parsedUser.phone || "")
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    // Update user information
    const updatedUser = {
      ...user,
      name,
      email,
      phone,
    }

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)

    // Show success message
    setSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccess(false)
    }, 3000)
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
              <h1 className="text-2xl font-bold">Profile</h1>
              <p className="text-gray-600">Manage your account information</p>
            </div>
          </div>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Profile updated successfully!
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <UserCircleIcon className="h-24 w-24 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full">
                  <span className="font-medium">{user.points} loyalty points</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
