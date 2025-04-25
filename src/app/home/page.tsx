"use client";

import { FieldCard } from "../../components/FieldCard";

export default function Home() {
  // Mock data
  const fields = [
    { id: 1, name: "Field A", location: "North Wing", image: "/field-a.jpg" },
    { id: 2, name: "Field B", location: "South Wing", image: "/field-b.jpg" },
  ];

  return (
    <main className="home-container">
      <section className="hero">
        <h1>Book Your Soccer Field</h1>
        <p>Reserve your play time and earn rewards with every booking</p>
      </section>
      \
      <section className="fields-section">
        <h2>Our Fields</h2>
        <div className="fields-grid">
          {fields.map((field) => (
            <FieldCard key={field.id} field={field} />
          ))}
        </div>
      </section>
    </main>
  );
}
