import React, { useState } from "react";
import API from "../../API/api";

export default function InventoryTable({
  inventoryList,
  calcUnitPrice,
  fetchInventory,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editedInventory, setEditedInventory] = useState(null);

  const handleEdit = (emp) => {
    setEditingId(emp._id);
    setEditedInventory(emp);
  };

  const handleChange = (field, value) => {
    setEditedInventory({ ...editedInventory, [field]: value });
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
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete("inventory/deleteInventory", {
        headers: { Authorization: `Bearer ${token}` },
        data: { id },
      });
      await fetchInventory();
    } catch (error) {
      console.error("Failed to Upload", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl shadow">
      <table className="min-w-full border border-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">
              Item#
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">
              Item
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">
              Vendor
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">
              Volume/Pack
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">
              Pack Price
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">
              Unit Price
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">
              In Stock
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {inventoryList.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-400 italic">
                No items added yet.
              </td>
            </tr>
          ) : (
            inventoryList.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  {editingId === item._id ? (
                    <input
                      value={editedInventory?.name || ""}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === item._id ? (
                    <select
                      value={editedInventory?.vendor || ""}
                      onChange={(e) => handleChange("vendor", e.target.value)}
                      className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                      <option value="">Select Vendor</option>
                      <option value="Costco">Costco</option>
                      <option value="Sams">Sams</option>
                      <option value="Namdaemun">Namdaemun</option>
                      <option value="Metrochef">Metrochef</option>
                      <option value="Hmart">Hmart</option>
                      <option value="Sysco">Sysco</option>
                      <option value="Restaurantdepot">Restaurantdepot</option>
                      <option value="Aldi">Aldi</option>
                      <option value="Kroger">Kroger</option>
                      <option value="Walmart">Walmart</option>
                    </select>
                  ) : (
                    item.vendor
                  )}
                </td>

                <td className="px-4 py-2">
                  {editingId === item._id ? (
                    <input
                      value={editedInventory?.volume || ""}
                      onChange={(e) => handleChange("volume", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    item.volume
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === item._id ? (
                    <input
                      type="number"
                      value={editedInventory?.price || ""}
                      onChange={(e) => handleChange("price", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    `$${item.price}`
                  )}
                </td>
                <td className="px-4 py-2">${item.unitPrice.toFixed(2)}</td>
                <td className="px-4 py-2">
                  {editingId === item._id ? (
                    <input
                      type="number"
                      value={editedInventory?.inStock || ""}
                      onChange={(e) => handleChange("inStock", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    item.inStock
                  )}
                </td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  {editingId === item._id ? (
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
                        onClick={() => handleEdit(item)}
                        className="bg-twohas hover:bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-twohas hover:bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm transition"
                      >
                        Delete
                      </button>
                    </>
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
