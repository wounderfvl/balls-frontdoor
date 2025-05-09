"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <main className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="bg-red-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Borneo Anfield</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-red-200">
              Home
            </Link>
            <Link href="#facilities" className="hover:text-red-200">
              Facilities
            </Link>
            <Link href="#gallery" className="hover:text-red-200">
              Gallery
            </Link>
            <Link href="#video" className="hover:text-red-200">
              Video
            </Link>
            <Link href="#pricing" className="hover:text-red-200">
              Pricing
            </Link>
            <Link href="#contact" className="hover:text-red-200">
              Contact Us
            </Link>
            <Link href="/pengguna" className="hover:text-red-200">
              Check Schedule
            </Link>
          </div>
          <div className="md:hidden">
            <button className="text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-red-700 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-white hover:bg-red-800 rounded-md">
              Home
            </Link>
            <Link href="#facilities" className="block px-3 py-2 text-white hover:bg-red-800 rounded-md">
              Facilities
            </Link>
            <Link href="#gallery" className="block px-3 py-2 text-white hover:bg-red-800 rounded-md">
              Gallery
            </Link>
            <Link href="#video" className="block px-3 py-2 text-white hover:bg-red-800 rounded-md">
              Video
            </Link>
            <Link href="#pricing" className="block px-3 py-2 text-white hover:bg-red-800 rounded-md">
              Pricing
            </Link>
            <Link href="#contact" className="block px-3 py-2 text-white hover:bg-red-800 rounded-md">
              Contact Us
            </Link>
            <Link href="/pengguna" className="block px-3 py-2 text-white hover:bg-red-800 rounded-md">
              Check Schedule
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/BASland.jpg?height=1080&width=1920"
            alt="Borneo Anfield Stadium"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">WELCOME!</h1>
          <h2 className="text-3xl md:text-5xl font-semibold mb-8">KEEPING THE GAME BEAUTIFUL</h2>
          <h3 className="text-2xl md:text-4xl font-medium mb-12">BORNEO ANFIELD STADIUM</h3>
          <Link
            href="/auth/login"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300"
          >
            Let's Play!
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Borneo Anfield Stadium</h2>
              <p className="text-gray-400">Keeping the game beautiful</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="#facilities" className="text-gray-400 hover:text-white">
                      Facilities
                    </Link>
                  </li>
                  <li>
                    <Link href="#gallery" className="text-gray-400 hover:text-white">
                      Gallery
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-400">info@borneoanfield.com</li>
                  <li className="text-gray-400">+62 123 456 7890</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Borneo Anfield Stadium. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
