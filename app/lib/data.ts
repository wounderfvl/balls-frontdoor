// Mock data for the application

export interface Field {
  id: string
  name: string
  location: string
  pricePerHour: number
  description: string
  isAvailable: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  points: number
  role: "admin" | "super_admin" | "customer"
}

export interface Booking {
  id: string
  fieldId: string
  userId: string
  date: string
  startTime: string
  endTime: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  totalPrice: number
  createdAt: string
  updatedAt: string
}

export interface Reward {
  id: string
  name: string
  description: string
  pointsRequired: number
  isActive: boolean
}

export interface RedeemedReward {
  id: string
  userId: string
  rewardId: string
  redeemedAt: string
}

export const fields: Field[] = [
  {
    id: "1",
    name: "Field A",
    location: "North Wing",
    pricePerHour: 50,
    description: "Standard field with artificial grass",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Field B",
    location: "South Wing",
    pricePerHour: 60,
    description: "Premium field with natural grass",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Field C",
    location: "East Wing",
    pricePerHour: 55,
    description: "Indoor field with air conditioning",
    isAvailable: true,
  },
]

export const rewards: Reward[] = [
  {
    id: "1",
    name: "25% Off Booking Hour",
    description: "Get 25% discount on your next booking",
    pointsRequired: 7,
    isActive: true,
  },
  {
    id: "2",
    name: "Fried Rice",
    description: "Free fried rice at BAS Cafe",
    pointsRequired: 8,
    isActive: true,
  },
  {
    id: "3",
    name: "Boba BAS",
    description: "Free boba drink at BAS Cafe",
    pointsRequired: 6,
    isActive: true,
  },
  {
    id: "4",
    name: "50% Off Booking Hour",
    description: "Get 50% discount on your next booking",
    pointsRequired: 14,
    isActive: true,
  },
  {
    id: "5",
    name: "50% Off Shoes Rent",
    description: "Get 50% discount on shoes rental",
    pointsRequired: 5,
    isActive: true,
  },
  {
    id: "6",
    name: "Jumbo Burger BAS",
    description: "Free jumbo burger at BAS Cafe",
    pointsRequired: 8,
    isActive: true,
  },
]
