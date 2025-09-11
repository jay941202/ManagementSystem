import React, { useState } from "react";
import API from "../../../API/api";

export default function InventoryTable({ inventoryList, fetchInventory }) {
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
    <div className="overflow-x-auto rounded-xl shadow">
      <table className="min-w-full table-auto border border-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2 border-b text-left text-xs sm:text-sm font-semibold text-gray-600 w-20">
              Item
            </th>
            <th className="px-2 py-2 border-b text-left text-xs sm:text-sm font-semibold text-gray-600 w-28">
              Vendor
            </th>
            <th className="px-2 py-2 border-b text-left text-xs sm:text-sm font-semibold text-gray-600 w-16">
              Volume/EA
            </th>
            <th className="px-2 py-2 border-b text-left text-xs sm:text-sm font-semibold text-gray-600 w-16">
              Unit
            </th>
            <th className="px-2 py-2 border-b text-left text-xs sm:text-sm font-semibold text-gray-600 w-16">
              EA/Case
            </th>
            <th className="px-2 py-2 border-b text-left text-xs sm:text-sm font-semibold text-gray-600 w-20">
              Price
            </th>
            <th className="px-2 py-2 border-b text-left text-xs sm:text-sm font-semibold text-gray-600 w-20">
              Unit Price
            </th>
            <th className="px-2 py-2 border-b text-left text-xs sm:text-sm font-semibold text-gray-600 w-20">
              Updated By
            </th>
            <th className="px-2 py-2 border-b text-center text-xs sm:text-sm font-semibold text-gray-600 w-24">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {inventoryList.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-6 text-gray-400 italic">
                No items added yet.
              </td>
            </tr>
          ) : (
            inventoryList.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-2 py-1 text-xs sm:text-sm">
                  {editingId === item._id ? (
                    <input
                      value={editedInventory?.name || ""}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="border rounded px-2 py-1 w-full max-w-[120px]"
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="px-2 py-1 text-xs sm:text-sm">
                  {editingId === item._id ? (
                    <select
                      value={editedInventory?.vendor || ""}
                      onChange={(e) => handleChange("vendor", e.target.value)}
                      className="border rounded px-2 py-1 w-full max-w-[120px]"
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
                      <option value="Korea">Korea</option>
                      <option value="Wooltari">Wooltari</option>
                      <option value="Webstaurant">Webstaurant</option>
                      <option value="Greentea">Greentea</option>
                    </select>
                  ) : (
                    item.vendor
                  )}
                </td>
                <td className="px-2 py-1 text-xs sm:text-sm">
                  {editingId === item._id ? (
                    <input
                      value={editedInventory?.volume || ""}
                      onChange={(e) => handleChange("volume", e.target.value)}
                      className="border rounded px-2 py-1 w-full max-w-[80px]"
                    />
                  ) : (
                    item.volume
                  )}
                </td>
                <td className="px-2 py-1 text-xs sm:text-sm">
                  {editingId === item._id ? (
                    <select
                      value={editedInventory?.unit || ""}
                      onChange={(e) => handleChange("unit", e.target.value)}
                      className="border rounded px-2 py-1 w-full max-w-[120px]"
                    >
                      <option value="">Select Unit</option>
                      <option value="Kg">Kg</option>
                      <option value="g">g</option>
                      <option value="L">L</option>
                      <option value="mL">mL</option>
                      <option value="ea">ea</option>
                      <option value="lb">lb</option>
                    </select>
                  ) : (
                    item.unit
                  )}
                </td>
                <td className="px-2 py-1 text-xs sm:text-sm">
                  {editingId === item._id ? (
                    <input
                      value={editedInventory?.unitPerCase || ""}
                      onChange={(e) =>
                        handleChange("unitPerCase", e.target.value)
                      }
                      className="border rounded px-2 py-1 w-full max-w-[80px]"
                    />
                  ) : (
                    item.unitPerCase
                  )}
                </td>
                <td className="px-2 py-1 text-xs sm:text-sm">
                  {editingId === item._id ? (
                    <input
                      type="number"
                      value={editedInventory?.price || ""}
                      onChange={(e) => handleChange("price", e.target.value)}
                      className="border rounded px-2 py-1 w-full max-w-[80px]"
                    />
                  ) : (
                    `$${item.price}`
                  )}
                </td>
                <td className="px-2 py-1 text-xs sm:text-sm">
                  {item.unitPrice.toFixed(3)}
                </td>
                <td className="px-2 py-1 text-xs sm:text-sm">
                  {editingId === item._id ? (
                    <select
                      value={editedInventory?.updatesByEmp}
                      onChange={(e) =>
                        handleChange("updatesByEmp", e.target.value)
                      }
                      className="border rounded px-2 py-1 w-full max-w-[120px]"
                    >
                      <option value="">Updates by</option>
                      <option value="Kitchen">Kitchen</option>
                      <option value="Staff">Staff</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    item.updatesByEmp
                  )}
                </td>

                <td className="px-2 py-1 flex justify-center gap-2">
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
