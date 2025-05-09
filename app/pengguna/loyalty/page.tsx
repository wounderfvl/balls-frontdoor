"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

interface User {
  id: string
  name: string
  email: string
  phone: string
  points: number
}

interface Reward {
  id: string
  name: string
  description: string
  pointsRequired: number
  image: string
}

const rewards: Reward[] = [
  {
    id: "1",
    name: "25% Off Booking Hour",
    description: "Get 25% discount on your next booking",
    pointsRequired: 7,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Fried Rice",
    description: "Free fried rice at BAS Cafe",
    pointsRequired: 8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Boba BAS",
    description: "Free boba drink at BAS Cafe",
    pointsRequired: 6,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "50% Off Booking Hour",
    description: "Get 50% discount on your next booking",
    pointsRequired: 14,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "50% Off Shoes Rent",
    description: "Get 50% discount on shoes rental",
    pointsRequired: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "6",
    name: "Jumbo Burger BAS",
    description: "Free jumbo burger at BAS Cafe",
    pointsRequired: 8,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function LoyaltyPage() {
  const [user, setUser] = useState<User | null>(null)
  const [showQRCode, setShowQRCode] = useState(false)
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [redeemedRewards, setRedeemedRewards] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/auth/login")
      return
    }

    setUser(JSON.parse(storedUser))

    // Get redeemed rewards from localStorage
    const storedRewards = localStorage.getItem("redeemedRewards")
    if (storedRewards) {
      setRedeemedRewards(JSON.parse(storedRewards))
    }
  }, [router])

  const handleRedeemReward = (reward: Reward) => {
    if (!user) return

    if (user.points >= reward.pointsRequired) {
      setSelectedReward(reward)
      setShowQRCode(true)
    } else {
      alert(`You need ${reward.pointsRequired - user.points} more points to redeem this reward.`)
    }
  }

  const handleConfirmRedeem = () => {
    if (!user || !selectedReward) return

    // Update user points
    const updatedUser = {
      ...user,
      points: user.points - selectedReward.pointsRequired,
    }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Add to redeemed rewards
    const newRedeemedReward = {
      id: Math.random().toString(36).substring(2, 9),
      reward: selectedReward,
      redeemedAt: new Date().toISOString(),
    }

    const updatedRewards = [...redeemedRewards, newRedeemedReward]
    setRedeemedRewards(updatedRewards)
    localStorage.setItem("redeemedRewards", JSON.stringify(updatedRewards))

    // Close QR code modal
    setShowQRCode(false)
    setSelectedReward(null)
  }

  const toggleHistory = () => {
    setShowHistory(!showHistory)
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-red-600">BALLS</h1>
              <p className="text-gray-600">Borneo Anfield Loyalty System</p>
            </div>
            <button
              onClick={toggleHistory}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            >
              {showHistory ? "View All Rewards" : "Gift History"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {showHistory ? (
            <div>
              <h2 className="text-xl font-bold mb-6">Redeem History</h2>

              {redeemedRewards.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">You haven't redeemed any rewards yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {redeemedRewards.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 flex items-center">
                      <div className="w-16 h-16 relative mr-4">
                        <Image
                          src={item.reward.image || "/placeholder.svg"}
                          alt={item.reward.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.reward.name}</h3>
                        <p className="text-sm text-gray-500">{item.reward.pointsRequired} Stamp</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{new Date(item.redeemedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-6">Loyalty Card Digital</h2>
              <p className="text-gray-600 mb-6">Pilih hadiah dan tukar stampel kamu!</p>

              {/* Stamps Display */}
              <div className="mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-medium">Your Stamps:</p>
                    <p className="font-bold text-red-600">{user.points} points</p>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {(() => {
                      // Find the maximum points required for any reward
                      const maxPoints = Math.max(...rewards.map((reward) => reward.pointsRequired))
                      // Create an array of that length
                      return [...Array(maxPoints)].map((_, index) => (
                        <div
                          key={index}
                          className={`w-full aspect-square rounded-full flex items-center justify-center ${
                            index < user.points ? "bg-red-600 text-white" : "bg-gray-200"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ))
                    })()}
                  </div>
                </div>
              </div>

              {/* Rewards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <div key={reward.id} className="border rounded-lg overflow-hidden">
                    <div className="h-40 relative">
                      <Image src={reward.image || "/placeholder.svg"} alt={reward.name} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">{reward.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{reward.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-red-600">{reward.pointsRequired} Stamp</p>
                        <button
                          onClick={() => handleRedeemReward(reward)}
                          className={`px-3 py-1 rounded-lg ${
                            user.points >= reward.pointsRequired
                              ? "bg-red-600 text-white hover:bg-red-700"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRCode && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-md w-full my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Tunjukkan QR Code ini kepada kasir BAS!</h2>
              <button onClick={() => setShowQRCode(false)} className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="w-full aspect-square relative mb-4">
                <Image src="/placeholder.svg?height=300&width=300" alt="QR Code" fill className="object-contain" />
              </div>
              <div className="text-center">
                <h3 className="font-medium">{selectedReward.name}</h3>
                <p className="text-sm text-gray-500">{selectedReward.pointsRequired} points</p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleConfirmRedeem}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Oke
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
