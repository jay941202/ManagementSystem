import React, { useState } from "react";
import API from "../API/api";

export default function SignUpModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: "", password: "", number: "" });

  const handleChange = (e) => {
    return setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/register", form);
      setTimeout(() => {
        alert(res.data.message);
        onClose();
      }, 1000);
      onSuccess();
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-twohas flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            className="w-full px-3 py-2 border-2 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-3 py-2 border-2 rounded"
          />
          <input
            name="number"
            type="number"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full px-3 py-2 border-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-twohas text-white py-2 rounded font-bold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
