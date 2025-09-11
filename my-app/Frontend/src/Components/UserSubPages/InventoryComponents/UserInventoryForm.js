import React from "react";

export default function UserInventoryForm({
  newInventory,
  setNewInventory,
  handleAddInventory,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Add Inventory
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Item Name
          </label>
          <input
            type="text"
            placeholder="Ex: Coke"
            value={newInventory.name}
            onChange={(e) =>
              setNewInventory({ ...newInventory, name: e.target.value })
            }
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Quantity
          </label>
          <input
            type="text"
            placeholder="Ex: 24"
            value={newInventory.inStock}
            onChange={(e) =>
              setNewInventory({ ...newInventory, inStock: e.target.value })
            }
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          onClick={handleAddInventory}
          disabled={!newInventory.name.trim() || !newInventory.inStock}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors"
        >
          + Add
        </button>
      </div>
    </div>
  );
}
