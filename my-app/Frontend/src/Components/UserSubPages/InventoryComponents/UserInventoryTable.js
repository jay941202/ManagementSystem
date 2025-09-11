import React, { useState } from "react";
import API from "../../../API/api";

export default function UserInventoryTable({ inventoryList, fetchInventory }) {
  const [editingId, setEditingId] = useState(null);
  const [editedInventory, setEditedInventory] = useState(null);
  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditedInventory(item);
  };

  const handleChange = (value) => {
    setEditedInventory({ ...editedInventory, inStock: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = { ...editedInventory, id: editedInventory._id };
      await API.put("inventory/updateInventory", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingId(null);
      await fetchInventory();
    } catch (error) {
      console.error("Failed to Upload", error);
    }
  };
  const handleMas = async (item) => {
    try {
      const token = localStorage.getItem("token");
      const payload = { id: item._id, enough: false };
      await API.put("inventory/updateInventory", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchInventory();
    } catch (error) {
      console.error("Failed to Upload", error);
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg bg-white p-6 border border-gray-300">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 1/5">
              #
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 text-center 1/5">
              Name
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 text-center 1/5">
              In Stock
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 text-center 1/5">
              Need Purchase?
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-center text-sm font-semibold text-gray-700 w-1/5">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {inventoryList.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-400 italic">
                No items added yet.
              </td>
            </tr>
          ) : (
            inventoryList.map((item, index) => (
              <tr
                key={item._id}
                className={`${
                  item.enough === false ? "bg-twohas text-white" : ""
                }`}
              >
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-center">{item.name}</td>
                <td className="px-4 py-3 text-sm text-center">
                  {editingId === item._id ? (
                    <input
                      type="number"
                      value={editedInventory.inStock || item.inStock}
                      onChange={(e) => handleChange(e.target.value)}
                      className="border rounded px-3 py-1 w-20 focus:outline-none text-black focus:ring-2 focus:ring-blue-400"
                    />
                  ) : (
                    item.inStock
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleMas(item)}
                    className="bg-twohas hover:bg-gray-600 text-white text-sm font-semibold px-4 py-1 rounded-lg shadow transition"
                  >
                    Mas!
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  {editingId === item._id ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-1 rounded-lg shadow transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-twohas hover:bg-gray-600 text-white text-sm font-semibold px-4 py-1 rounded-lg shadow transition"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
