"use client";

import { useState } from "react";
import axios from "axios";
import { baseURL } from "@/types/var";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Logging in...");
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post(`${baseURL}/auth/signin`, {
        username,
        password,
      });
      console.log("Login successful:", response.data);
      // Handle successful login redirect to back-office
      window.location.href = "/back-office";
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)] overflow-hidden bg-white">
      <form
        onSubmit={handleLogin}
        className="bg-bgPrimary p-12 rounded shadow-md w-full max-w-sm border-title border"
      >
        <h2 className="text-4xl text-title font-bold text-center mb-6 ">
          Admin Login
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-subtitle text-sm font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-subtitle text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full border border-title text-title px-6 py-3 rounded-md hover:bg-amber-400 hover:text-title transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
