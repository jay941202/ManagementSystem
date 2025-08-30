import React, { useEffect, useState } from "react";
import API from "../../API/api";

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

export default function ClosingSummary() {
  const [cashCountList, setCashCountList] = useState([]);
  const [refundList, setRefundList] = useState([]);

  const fetchCashCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/summary/cashCountList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCashCountList(res.data);
    } catch (error) {
      console.error("Failed", error);
    }
  };

  const fetchRefund = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/summary/refundList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefundList(res.data);
    } catch (error) {
      console.error("Failed", error);
    }
  };

  useEffect(() => {
    fetchCashCount();
    fetchRefund();
  }, []);

  return (
    <div className="space-y-8 p-4">
      <div className="overflow-x-auto rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Refund Summary</h2>
        <table className="min-w-full table-auto border border-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Ticket
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Reason
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {refundList.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-2 py-1 text-sm">{item.ticketNumber}</td>
                <td className="px-2 py-1 text-sm">{item.reason}</td>
                <td className="px-2 py-1 text-sm">
                  {formatTime(item.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Cash Count</h2>
        <table className="min-w-full table-auto border border-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Timestamp
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Total
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Bills
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Coins
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cashCountList.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-2 py-1 text-sm">
                  {formatTime(item.timestamp)}
                </td>
                <td className="px-2 py-1 text-sm">${item.totalAmount}</td>
                <td className="px-2 py-1 text-sm">
                  <table className="min-w-full table-auto border border-gray-300 bg-gray-50">
                    <thead>
                      <tr>
                        {Object.keys(item.bills).map((key) => (
                          <th key={key} className="border px-1 py-0.5 text-xs">
                            {key}$
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Object.values(item.bills).map((value, i) => (
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
                <td className="px-2 py-1 text-sm">
                  <table className="min-w-full table-auto border border-gray-300 bg-gray-50">
                    <thead>
                      <tr>
                        {Object.keys(item.coins).map((key) => (
                          <th key={key} className="border px-1 py-0.5 text-xs">
                            {key}$
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Object.values(item.coins).map((value, i) => (
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
      </div>
    </div>
  );
}
