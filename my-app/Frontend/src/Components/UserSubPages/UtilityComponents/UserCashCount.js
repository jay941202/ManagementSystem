import React, { useEffect, useState } from "react";
import API from "../../../API/api";

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const datePart = date.toLocaleDateString(undefined, {
    month: "2-digit",
    day: "2-digit",
  });
  const timePart = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart} ${timePart}`;
};

const BILL_DENOMINATIONS = [1, 5, 10, 20, 50, 100];

export default function UserCashCount({ workday }) {
  const [cashCounts, setCashCounts] = useState([]);
  const [billInputs, setBillInputs] = useState(
    BILL_DENOMINATIONS.reduce((acc, d) => ({ ...acc, [d]: "" }), {})
  );

  const fetchCashCounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/summary/cashCountList", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const todayCounts = res.data
        .filter((count) => {
          const d = new Date(count.timestamp || count.createdAt);
          const formatted = `${d.getMonth() + 1}/${d.getDate()}`;
          return formatted === workday;
        })
        .map((count) => ({
          ...count,
          bills: count.bills || {},
        }));

      setCashCounts(todayCounts);
    } catch (err) {
      console.error("Failed to fetch cash counts", err);
    }
  };

  useEffect(() => {
    fetchCashCounts();
  }, []);

  const calculateTotal = () => {
    return Object.entries(billInputs).reduce(
      (sum, [denom, qty]) => sum + denom * qty,
      0
    );
  };

  const handleInputChange = (denomination, value) => {
    setBillInputs((prev) => ({ ...prev, [denomination]: Number(value) }));
  };

  const handleAddCashCount = async () => {
    try {
      const totalAmount = calculateTotal();

      const payload = {
        totalAmount,
        bills: { ...billInputs },
        timestamp: new Date().toISOString(),
      };

      const token = localStorage.getItem("token");
      const res = await API.post("/summary/cashCount", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCashCounts((prev) => [...prev, res.data]);
      setBillInputs(
        BILL_DENOMINATIONS.reduce((acc, d) => ({ ...acc, [d]: "" }), {})
      );
    } catch (err) {
      console.error("Failed to add cash count", err);
      alert("Failed to update CashCount.");
    }
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4 text-twohas">Cash Count</h2>

      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h3 className="font-semibold text-lg mb-3">Add New Cash Count</h3>
        <div className="grid grid-cols-6 gap-4 mb-3">
          {BILL_DENOMINATIONS.map((d) => (
            <div key={d} className="flex flex-col items-center">
              <span className="text-sm font-medium">{d}$</span>
              <input
                type="number"
                min={0}
                value={billInputs[d]}
                onChange={(e) => handleInputChange(d, e.target.value)}
                className="w-full border px-2 py-1 rounded text-center"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAddCashCount}
            className="px-5 py-2 bg-twohas text-white rounded-lg shadow hover:bg-twohas/80 font-semibold"
          >
            Add (${calculateTotal().toFixed(2)})
          </button>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-200 text-sm rounded-lg overflow-hidden shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 w-36">Date</th>
            <th className="border px-4 py-2 w-24">Total</th>
            <th className="border px-4 py-2">Bills</th>
          </tr>
        </thead>
        <tbody>
          {cashCounts.map((count) => (
            <tr key={count.id} className="hover:bg-gray-50">
              <td className="px-2 py-1 text-sm">
                {formatTime(count.timestamp || count.createdAt)}
              </td>
              <td className="px-2 py-1 text-sm text-center">
                ${count.totalAmount}
              </td>
              <td className="px-2 py-1 text-sm">
                <table className="min-w-full table-auto border border-gray-300 bg-gray-50">
                  <thead>
                    <tr>
                      {Object.keys(count.bills || {}).map((key) => (
                        <th key={key} className="border px-1 py-0.5 text-xs">
                          {key}$
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.values(count.bills || {}).map((value, i) => (
                        <td
                          key={i}
                          className="border px-1 py-0.5 text-center text-xs"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
