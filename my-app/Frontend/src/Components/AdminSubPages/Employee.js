import React, { useEffect, useState } from "react";
import API from "../../API/api";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({});
  const today = new Date().toISOString().split("T")[0];
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    hourlyPay: "",
    number: "",
    TipPercentage: "",
    Active: true,
    StartDate: today,
    taxReport: "",
  });
  const [active, setActive] = useState();
  const activeHandler = () => {
    setActive((prev) => !prev);
  };
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
      const payload = { ...editedEmployee, id: editedEmployee._id };
      await API.put("/employee/updateEmployee", payload, {
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
      setNewEmployee({
        name: "",
        hourlyPay: "",
        number: "",
        TipPercentage: "",
        Active: true,
        StartDate: today,
        taxReport: "",
      });
      console.log(newEmployee);
      await fetchEmployee();
    } catch (error) {
      console.error("Failed to add", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-4xl font-semibold text-gray-800">Employees</h2>
        <button
          onClick={handleAddEmployee}
          disabled={
            !newEmployee.name.trim() ||
            !newEmployee.number.trim() ||
            !newEmployee.taxReport ||
            newEmployee.hourlyPay <= 0
          }
          className="bg-twohas hover:bg-gray-600 text-white px-4 py-2 rounded shadow"
        >
          + Add Employee
        </button>
      </div>

      <div className="mb-6 p-4 bg-white rounded shadow grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, name: e.target.value })
          }
          className="border px-3 py-2 rounded w-full"
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
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Phone"
          value={newEmployee.number}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, number: e.target.value })
          }
          className="border px-3 py-2 rounded w-full"
        />
        <select
          value={
            newEmployee.TipPercentage === ""
              ? ""
              : newEmployee.TipPercentage * 100
          }
          onChange={(e) =>
            setNewEmployee({
              ...newEmployee,
              TipPercentage:
                e.target.value === "" ? "" : parseFloat(e.target.value) / 100,
            })
          }
          className={`border px-3 py-2 rounded w-full ${
            !newEmployee.TipPercentage ? "text-gray-400" : "text-black"
          }`}
        >
          <option value="">Select Tip Percentage</option>
          <option value="50">50%</option>
          <option value="70">70%</option>
          <option value="100">100%</option>
        </select>
        <select
          value={newEmployee.taxReport}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, taxReport: e.target.value })
          }
          className={`border px-3 py-2 rounded w-full ${
            !newEmployee.taxReport ? "text-gray-400" : "text-black"
          }`}
        >
          <option value="">Select Tax Report</option>
          <option value="1099">1099</option>
          <option value="W-2">W-2</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full table-auto divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left w-8">#</th>
              <th className="px-4 py-2 text-left w-32">Name</th>
              <th className="px-4 py-2 text-left w-28">Tax Report</th>
              <th className="px-4 py-2 text-left w-24">Hourly Pay</th>
              <th className="px-4 py-2 text-left w-28">Phone</th>
              <th className="px-4 py-2 text-left w-28">StartDate</th>
              <th className="px-4 py-2 text-left w-20">Tip%</th>
              <th
                onClick={activeHandler}
                className="px-4 py-2 text-left w-20 cursor-pointer hover:bg-gray-400"
              >
                Active
              </th>

              <th className="px-4 py-2 text-center w-40">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {employees
              .filter((emp) => active || emp.Active)
              .map((emp, index) => (
                <tr key={emp._id} className="hover:bg-gray-200 transition">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
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
                  <td className="px-4 py-2">
                    {editingId === emp._id ? (
                      <select
                        value={editedEmployee.taxReport || ""}
                        onChange={(e) =>
                          handleChange("taxReport", e.target.value)
                        }
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="">Select Tax Report</option>
                        <option value="1099">1099</option>
                        <option value="W-2">W-2</option>
                      </select>
                    ) : (
                      emp.taxReport
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingId === emp._id ? (
                      <input
                        type="number"
                        value={
                          editedEmployee.hourlyPay === ""
                            ? ""
                            : editedEmployee.hourlyPay
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          handleChange(
                            "hourlyPay",
                            val === "" ? "" : parseFloat(val)
                          );
                        }}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      `$${(emp.hourlyPay ?? 0).toFixed(2)}`
                    )}
                  </td>
                  <td className="px-4 py-2">
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
                  <td className="px-4 py-2">
                    {editingId === emp._id ? (
                      <input
                        type="date"
                        value={editedEmployee.StartDate || ""}
                        onChange={(e) =>
                          handleChange("StartDate", e.target.value)
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : emp.StartDate ? (
                      new Date(emp.StartDate).toLocaleDateString()
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingId === emp._id ? (
                      <select
                        value={
                          editedEmployee.TipPercentage === ""
                            ? ""
                            : editedEmployee.TipPercentage * 100
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          handleChange(
                            "TipPercentage",
                            val === "" ? "" : parseFloat(val) / 100
                          );
                        }}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="">Select</option>
                        <option value="50">50%</option>
                        <option value="70">70%</option>
                        <option value="100">100%</option>
                      </select>
                    ) : emp.TipPercentage !== undefined &&
                      emp.TipPercentage !== "" ? (
                      `${emp.TipPercentage * 100}%`
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingId === emp._id ? (
                      <select
                        value={editedEmployee.Active ? "Yes" : "No"}
                        onChange={(e) =>
                          handleChange("Active", e.target.value === "Yes")
                        }
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    ) : emp.Active !== undefined ? (
                      emp.Active ? (
                        "Yes"
                      ) : (
                        "No"
                      )
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    {editingId === emp._id ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm transition"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(emp)}
                          className="bg-twohas hover:bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm transition"
                        >
                          Edit
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
