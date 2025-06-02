import React, { useEffect, useState } from "react";
import API from "../../API/api";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/employee/employeeList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data);
    } catch (error) {
      console.error("Failed", error);
    }
  };
  useEffect(() => {
    fetchEmployee();
  }, []);
  const onClickHandler = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete("/employee/deleteEmployee", {
        headers: { Authorization: `Bearer ${token}` },
        data: { id },
      });
    } catch (error) {
      console.error("Failed", error);
    }
    await fetchEmployee();
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold">Employee List</h2>
        <div className="flex gap-2"></div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-300">
            <tr>
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Hourly Pay</th>
              <th className="py-2 px-4 border-b">Phone#</th>
              <th className="py-2 px-4 border-b">Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {employees.map((emp, index) => (
              <tr key={emp._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{emp.name}</td>
                <td className="py-2 px-4 border-b">{emp.role}</td>
                <td className="py-2 px-4 border-b">{emp.hourlyPay}</td>
                <td className="py-2 px-4 border-b">{emp.number}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => onClickHandler(emp._id)}
                    className="bg-twohas text-white px-4 py-2 rounded border-b hover:bg-gray-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
