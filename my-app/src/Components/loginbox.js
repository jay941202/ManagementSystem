import React from "react";

export default function Loginbox() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-twohas">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="number"
              className="block text-gray-700 font-semibold mb-2"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="number"
              placeholder="Enter Phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-twohas text-white font-bold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
