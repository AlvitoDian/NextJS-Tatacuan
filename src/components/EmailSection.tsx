"use client";

import { useState } from "react";

export default function EmailSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="email"
        className="flex-1 px-4 py-3 rounded-md text-gray-800"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        type="submit"
        className="px-6 py-3 bg-white text-[#e44b37] font-medium rounded-md hover:bg-gray-100 transition"
      >
        Get Started
      </button>
    </form>
  );
}
