// components/admin/superadmin/SuperAdminAuth.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SuperAdminAuth = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // This is a simple frontend verification
    // In a real application, you would verify this against a backend
    if (password === "superadmin123") {
      // Store authentication state in session/local storage
      sessionStorage.setItem("superAdminAuthenticated", "true");
      router.push("/admin/super-admin/dashboard");
    } else {
      setError("Invalid password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Card className="p-8 w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Super Admin Authentication
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Enter Super Admin Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-center">
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                Verify
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminAuth;
