import type React from "react"
import { Inter } from "next/font/google"
import "./ui/global.css"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Borneo Anfield Stadium",
  description: "Booking and loyalty system for Borneo Anfield Stadium",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
