import React, { useState } from "react";
import API from "../../../API/api";

export default function TableForShopping({
  inventoryList,
  fetchInventory,
  isOn,
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
      console.log(payload);
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

  const filteredInventory = isOn
    ? inventoryList.filter((item) => item.enough === false)
    : inventoryList;

  const formattedTime = (timestamp) => {
    const date = new Date(timestamp);
    const datePart = date.toLocaleDateString(undefined, {
      month: "2-digit",
      day: "2-digit",
    });
    return `${datePart}`;
  };
  const handlePurchase = async (item) => {
    try {
      const token = localStorage.getItem("token");
      const payload = { id: item._id, enough: true };
      await API.put("inventory/updateInventory", payload, {
        headers: { Authorization: `Bearer ${token}` },
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
            <th className="px-2 py-2 border-b text-left text-xs sm:text-sm font-semibold text-gray-600 w-10">
              Item#
            </th>
            <th className="px-2 py-2 border-b text-left text-xs sm:text-sm font-semibold text-gray-600 w-24">
              Item
            </th>
            <th className="px-2 py-2 border-b text-left text-xs sm:text-sm font-semibold text-gray-600 w-20">
              In Stock
            </th>
            <th className="px-2 py-2 border-b text-center text-xs sm:text-sm font-semibold text-gray-600 w-16">
              Need Purchase?
            </th>
            <th className="px-2 py-2 border-b text-center text-xs sm:text-sm font-semibold text-gray-600 w-24">
              Price
            </th>
            <th className="px-2 py-2 border-b text-center text-xs sm:text-sm font-semibold text-gray-600 w-20">
              LastUpdate
            </th>
            <th className="px-2 py-2 border-b text-center text-xs sm:text-sm font-semibold text-gray-600 w-28">
              Action?
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredInventory.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-6 text-gray-400 italic">
                No items added yet.
              </td>
            </tr>
          ) : (
            filteredInventory.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="px-2 py-1 text-xs sm:text-sm">{index + 1}</td>
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
                <td className="px-2 py-1 text-xs sm:text-sm ">
                  {editingId === item._id ? (
                    <input
                      type="number"
                      value={editedInventory?.inStock || item.inStock}
                      onChange={(e) => handleChange("inStock", e.target.value)}
                      className="border rounded px-2 py-1 w-full max-w-[60px]"
                    />
                  ) : (
                    item.inStock
                  )}
                </td>
                <td
                  className={`px-2 py-1 text-xs sm:text-sm text-center ${
                    item.enough === false ? "bg-twohas text-white" : "bg-white"
                  }`}
                >
                  {isOn === false && editingId === item._id ? (
                    <select
                      value={editedInventory?.enough || ""}
                      onChange={(e) => handleChange("enough", e.target.value)}
                      className="border rounded px-2 py-1 w-full max-w-[120px] text-black"
                    >
                      <option value="">Need Purchase?</option>
                      <option value="false">Yes</option>
                      <option value="true">No</option>
                    </select>
                  ) : item.enough === true ? (
                    "No"
                  ) : (
                    "Yes"
                  )}
                </td>
                <td className="px-2 py-1 text-xs sm:text-sm text-center">
                  {editingId === item._id ? (
                    <input
                      type="number"
                      value={editedInventory?.price || item.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      className="border rounded px-2 py-1 w-full max-w-[80px]"
                    />
                  ) : (
                    `$${item.price}`
                  )}
                </td>
                <td className="px-2 py-1 text-xs sm:text-sm text-center">
                  {formattedTime(item.updatedAt)}
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
                      {isOn === true && (
                        <button
                          onClick={() => handlePurchase(item)}
                          className="bg-twohas hover:bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm transition"
                        >
                          Purchased
                        </button>
                      )}
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
