import React, { useEffect, useState } from "react";
import API from "../../../API/api";

export default function UnavailableDates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [pin, setPin] = useState("");
  const [employee, setEmployee] = useState([]);

  const openModal = () => {
    if (!form.startDate || !form.endDate) {
      return alert("Please choose start date and end date.");
    }
    setIsModalOpen(true);
    setPin("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/employee/employeeList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployee(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleConfirm = async () => {
    try {
      if (pin.length !== 4) {
        return alert("전화번호 마지막 4자리를 입력해주세요.");
      }
      const targetEmployee = employee.find(
        (e) => e.number.slice(-4) === String(pin)
      );
      if (!targetEmployee) return alert("PIN Not Matched");

      const payload = {
        employeeId: targetEmployee._id,
        ...form,
      };
      const token = localStorage.getItem("token");

      await API.put("/employee/unavailableDates", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Unavailable dates saved.");
      setIsModalOpen(false);
      setForm({ startDate: "", endDate: "", reason: "" });
    } catch (err) {
      console.error("Failed to save unavailable dates", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4 text-twohas">Unavailable Dates</h2>

      <div className="flex items-end gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="reason"
            value={form.reason}
            placeholder="Enter Reason"
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg ml-3"
          />
        </div>
        <button
          onClick={openModal}
          className="px-6 py-2 text-lg font-semibold bg-twohas text-white rounded-xl shadow-lg hover:bg-twohas/80 transition"
        >
          Add
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
            <h3 className="text-lg font-semibold text-twohas mb-4">
              Confirm with PIN
            </h3>
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter last 4 digits"
              className="w-full border px-4 py-2 rounded-lg text-center tracking-widest text-xl mb-4"
            />
            <div className="flex justify-between gap-4">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-twohas text-white rounded-lg hover:bg-twohas/80"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
