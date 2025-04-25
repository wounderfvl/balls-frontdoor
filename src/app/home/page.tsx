"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldCard } from "../../components/FieldCard";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/sign-in"); // Navigate to the Sign-In page
  };

  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to the Soccer Field Booking App</h1>
        <p>Reserve your play time and earn rewards with every booking.</p>
      </section>

      {/* Login Button */}
      <section className="auth-buttons">
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </section>
    </main>
  );
}
