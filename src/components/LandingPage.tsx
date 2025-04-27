"use client";

import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-image">
      <div className="content">
        <h1>Welcome</h1>
        <h2>Keeping the game beautiful</h2>
        <h3>Borneo Anfield Stadium</h3>
        <a href="/sign-in" className="btn">
          Let's Play
        </a>
      </div>
      <style jsx>{`
        .bg-image {
          background-image: url("/img/basland.jpg"); /* Path to your image */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          width: 100%;
          height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: "Poppins", sans-serif;
        }

        .content {
          background-color: rgba(
            0,
            0,
            0,
            0.6
          ); /* Semi-transparent black background */
          padding: 40px;
          border-radius: 10px;
          max-width: 80%;
          text-align: center;
        }

        h1,
        h2,
        h3 {
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        h1 {
          font-size: 3em;
          text-transform: uppercase;
        }

        h2 {
          text-transform: uppercase;
          font-size: 1.8em;
          font-weight: normal;
        }

        h3 {
          margin-top: 30px;
          font-size: 1.5em;
          margin-bottom: 20px;
        }

        .btn {
          display: inline-block;
          padding: 12px 30px;
          background-color: #cb0101; /* Red color */
          stroke: 2px solid #dec23b; /* White border */
          color: white;
          text-decoration: none;
          font-size: 1.2em;
          border-radius: 5px;
          transition: background-color 0.3s;
        }

        .btn:hover {
          background-color: #c1121f; /* Darker red on hover */
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
