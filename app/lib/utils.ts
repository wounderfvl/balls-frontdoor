import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Format date to display in a readable format
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

// Format time to display in a readable format
export function formatTime(time: string): string {
  return time
}

// Format currency to display in a readable format
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Generate a random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

// Check if a date is in the past
export function isPastDate(date: Date | string): boolean {
  const d = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d < today
}

// Check if a time slot is available
export function isTimeSlotAvailable(date: Date | string, time: string, bookings: any[]): boolean {
  // Convert date to string format for comparison
  const dateStr = typeof date === "string" ? date : date.toISOString().split("T")[0]

  // Check if there's any booking with the same date and time
  return !bookings.some(
    (booking) => booking.date === dateStr && booking.time === time && booking.status !== "cancelled",
  )
}

// Get available time slots for a specific date
export function getAvailableTimeSlots(date: Date | string, allTimeSlots: string[], bookings: any[]): string[] {
  return allTimeSlots.filter((time) => isTimeSlotAvailable(date, time, bookings))
}
