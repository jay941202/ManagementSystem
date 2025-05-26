import React, { useState } from "react";
import API from "../API/api";

export default function Loginbox() {
  const [form, setForm] = useState({ name: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/login", form);
      localStorage.setItem("token", res.data.token);
      setMessage("로그인성공");
      console.log(message);
    } catch (error) {
      setMessage(`로그인 실패 ${error}`);
      console.log(message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-twohas">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="number"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              name="name"
              type="name"
              id="name"
              placeholder="Enter Name"
              onChange={handleChange}
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
              name="password"
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={handleChange}
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
