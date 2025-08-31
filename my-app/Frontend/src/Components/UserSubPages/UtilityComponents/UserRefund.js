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

export default function UserRefund({ workday }) {
  const [refunds, setRefunds] = useState([]);
  const [newRefund, setNewRefund] = useState({
    ticketNumber: "",
    item: "",
    reason: "",
  });

  const filterWorkday = (date) => {
    const d = new Date(date);
    const formatted = `${d.getMonth() + 1}/${d.getDate()}`;
    return formatted === workday;
  };

  const handleInputChange = (field, value) => {
    setNewRefund((prev) => ({ ...prev, [field]: value }));
  };
  const fetchRefund = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/summary/refundList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefunds(res.data);
    } catch (error) {
      console.error("Failed to load Refund data", error);
    }
  };
  useEffect(() => {
    fetchRefund();
  }, []);

  const handleAddRefund = async () => {
    try {
      if (!newRefund.ticketNumber || !newRefund.item || !newRefund.reason)
        return;
      const token = localStorage.getItem("token");
      await API.post("/summary/addRefund", newRefund, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(newRefund);
      setNewRefund({ ticketNumber: "", item: "", reason: "" });
    } catch (error) {
      console.error("Failed to add Refund", error);
    }
  };

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4 text-twohas">Refunds</h2>

      <div className="mb-6 p-4 bg-white rounded-lg shadow flex flex-wrap items-end gap-3">
        <input
          type="text"
          placeholder="Ticket#"
          value={newRefund.ticketNumber}
          onChange={(e) => handleInputChange("ticketNumber", e.target.value)}
          className="flex-1 min-w-[120px] border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-twohas"
        />
        <input
          type="text"
          placeholder="Item"
          value={newRefund.item}
          onChange={(e) => handleInputChange("item", e.target.value)}
          className="flex-1 min-w-[150px] border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-twohas"
        />
        <input
          type="text"
          placeholder="Reason"
          value={newRefund.reason}
          onChange={(e) => handleInputChange("reason", e.target.value)}
          className="flex-1 min-w-[180px] border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-twohas"
        />
        <button
          onClick={handleAddRefund}
          className="px-5 py-2 bg-twohas text-white rounded shadow hover:bg-twohas/80 font-semibold text-sm"
        >
          Add
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full table-auto border border-gray-200 text-sm bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Ticket#
              </th>
              <th className="px-3 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Item
              </th>
              <th className="px-3 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Reason
              </th>
              <th className="px-3 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {refunds
              .filter((r) => filterWorkday(r.createdAt))
              .map((r) => (
                <tr
                  key={r.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="px-3 py-2">{r.ticketNumber}</td>
                  <td className="px-3 py-2">{r.item}</td>
                  <td className="px-3 py-2">{r.reason}</td>
                  <td className="px-3 py-2">{formatTime(r.createdAt)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
