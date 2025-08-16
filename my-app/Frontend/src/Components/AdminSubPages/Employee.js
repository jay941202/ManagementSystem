import React, { useEffect, useState } from "react";
import API from "../../API/api";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({});
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    hourlyPay: "",
    number: "",
  });

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
      await fetchEmployee();
    } catch (error) {
      console.error("Failed", error);
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp._id);
    setEditedEmployee(emp);
  };

  const handleChange = (field, value) => {
    setEditedEmployee({ ...editedEmployee, [field]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.put("/employee/updateEmployee", editedEmployee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingId(null);
      await fetchEmployee();
    } catch (error) {
      console.error("Failed to save", error);
    }
  };

  const handleAddEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.post("/employee/addEmployee", newEmployee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewEmployee({ name: "", role: "", hourlyPay: 0, number: "" });
      await fetchEmployee();
    } catch (error) {
      console.error("Failed to add", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-semibold text-gray-800">Employees</h2>
        <button
          onClick={handleAddEmployee}
          disabled={
            !newEmployee.name.trim() ||
            !newEmployee.role.trim() ||
            !newEmployee.number.trim() ||
            newEmployee.hourlyPay <= 0
          }
          className="bg-twohas hover:bg-gray-600 text-white px-4 py-2 rounded shadow"
        >
          + Add Employee
        </button>
      </div>

      <div className="mb-6 p-4 bg-white rounded shadow grid grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, name: e.target.value })
          }
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Role"
          value={newEmployee.role}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, role: e.target.value })
          }
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Hourly Pay"
          value={newEmployee.hourlyPay}
          onChange={(e) =>
            setNewEmployee({
              ...newEmployee,
              hourlyPay:
                e.target.value === "" ? "" : parseFloat(e.target.value),
            })
          }
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          value={newEmployee.number}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, number: e.target.value })
          }
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-600">
                #
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">
                Name
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">
                Role
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">
                Hourly Pay
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">
                Phone
              </th>
              <th className="px-6 py-4 text-center font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {employees.map((emp, index) => (
              <tr key={emp._id} className="hover:bg-gray-200 transition">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium">
                  {editingId === emp._id ? (
                    <input
                      value={editedEmployee.name || ""}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    emp.name
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === emp._id ? (
                    <input
                      value={editedEmployee.role || ""}
                      onChange={(e) => handleChange("role", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    emp.role
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === emp._id ? (
                    <input
                      type="number"
                      value={editedEmployee.hourlyPay || 0}
                      onChange={(e) =>
                        handleChange("hourlyPay", parseFloat(e.target.value))
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    `$${emp.hourlyPay.toFixed(2)}`
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === emp._id ? (
                    <input
                      value={editedEmployee.number || ""}
                      onChange={(e) => handleChange("number", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    emp.number
                  )}
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  {editingId === emp._id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(emp)}
                        className="bg-twohas hover:bg-gray-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onClickHandler(emp._id)}
                        className="bg-twohas hover:bg-gray-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm transition"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
