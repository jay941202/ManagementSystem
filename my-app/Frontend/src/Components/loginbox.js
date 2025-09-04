import React, { useState } from "react";
import API from "../API/api";
import SignUpModal from "./signUpModal";
import logo from "../Assets/logo.png";
import { useUser } from "../context/usercontext";

export default function Loginbox() {
  const { setRole, setUser } = useUser();
  const [form, setForm] = useState({ name: "", password: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [buttonActivate, setButtonActivate] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/login", form);
      localStorage.setItem("token", res.data.token);
      alert(`Successfully Logged In`);

      const role = await API.get("/user/role", {
        headers: { Authorization: `Bearer ${res.data.token}` },
      });

      setUser(role.data.name);
      setRole(role.data.role);

      localStorage.setItem("role", role.data.role);
      localStorage.setItem("user", JSON.stringify({ name: role.data.name }));
    } catch (error) {
      alert(`Login ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="relative w-full max-w-4xl h-48 md:h-64 mb-20 mx-auto">
        <img
          src={logo}
          alt="Background Logo"
          className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none select-none z-0"
        />
        <h1 className="text-twohas text-5xl md:text-6xl font-extrabold drop-shadow-lg select-none relative z-10 text-center flex items-center justify-center h-full">
          Twoha's Cafe
        </h1>
      </div>
      <div className="bg-twohas p-6 rounded-lg shadow-lg w-full max-w-md -mt-14 relative z-20">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="number"
              className="block text-white font-semibold mb-2"
            >
              Name
            </label>
            <input
              name="name"
              type="name"
              id="name"
              placeholder="Enter Name"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-white font-semibold mb-2"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-twohas font-bold py-3 rounded-md transition border-2 hover:bg-twohas hover:text-white hover:border-white"
            disabled={!form.name || !form.password}
          >
            Login
          </button>
          {/* {buttonActivate && (
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="w-full bg-white text-twohas font-bold py-3 rounded-md transition border-2 hover:bg-twohas hover:text-white hover:border-white"
            >
              Sign up
            </button>
          )} */}
        </form>
      </div>
      <SignUpModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => setButtonActivate(false)}
      />
    </div>
  );
}
