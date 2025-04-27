"use client";

import React from "react";
import { useRouter } from "next/navigation";

const DashboardPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="dashboard-container">
      {/* Page Title */}
      <h1 className="page-title">Borneo Anfield Stadium</h1>

      <div className="cards-wrapper">
        {/* Booking Page Card */}
        <div className="card-container" onClick={() => router.push("/booking")}>
          <img src="/img/lapangan.png" alt="Booking" className="card-image" />
          <div className="card-title">Booking</div>
          <div className="card-description">Reserve your field now</div>
        </div>

        {/* Loyalty Page Card */}
        <div className="card-container" onClick={() => router.push("/loyalty")}>
          <img src="/img/bola.png" alt="Loyalty" className="card-image" />
          <div className="card-title">Loyalty</div>
          <div className="card-description">Check your rewards and points</div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          flex-direction: column; /* Stack title and cards vertically */
          justify-content: center; /* Center content vertically */
          align-items: center; /* Center content horizontally */
          height: 100vh; /* Full height of the viewport */
          background-image: url("/img/basland.jpg"); /* Background image */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          text-align: center;
        }

        .page-title {
          font-size: 2.5em;
          color: white;
          margin-bottom: 30px; /* Space between title and cards */
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Add subtle shadow for readability */
        }

        .cards-wrapper {
          display: flex; /* Flexbox for horizontal layout */
          justify-content: center; /* Center the cards horizontally */
          align-items: center; /* Center the cards vertically */
          gap: 20px; /* Add space between the cards */
        }

        .card-container {
          background-color: #f6f6f6; /* Light background for the card */
          color: black;
          padding: 20px;
          border-radius: 10px;
          width: 300px;
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        .card-image {
          width: 80px;
          height: 80px;
          margin-bottom: 10px;
        }

        .card-title {
          font-size: 1.5em;
          margin-bottom: 10px;
          color: #333; /* Dark gray for title text */
          font-weight: bold;
        }

        .card-description {
          font-size: 1em;
          color: #555; /* Medium gray for description text */
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
