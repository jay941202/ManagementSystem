import React from "react";

export default function InventoryForm({
  newInventory,
  setNewInventory,
  handleAddInventory,
  isOn,
  setIsOn,
  inventoryOnly,
  setInventoryOnly,
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Inventory Management
        </h1>
        <div className="flex items-center gap-6">
          {inventoryOnly && (
            <label className="flex items-center cursor-pointer gap-2">
              <span className="font-medium text-gray-700">
                {isOn ? "Need Purchase" : "All Item"}
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isOn}
                  onChange={() => setIsOn(!isOn)}
                />
                <div className="w-11 h-6 rounded-full bg-blue-500 peer-checked:bg-green-500 transition"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
              </div>
            </label>
          )}
          <label className="flex items-center cursor-pointer gap-2">
            <span className="font-medium text-gray-700">
              {inventoryOnly ? "In stock Qty" : "Edit Inventory"}
            </span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={inventoryOnly}
                onChange={() => {
                  setInventoryOnly(!inventoryOnly);
                  setIsOn(false);
                }}
              />
              <div className="w-11 h-6 rounded-full bg-blue-500 peer-checked:bg-green-500 transition"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
            </div>
          </label>
          <button
            onClick={handleAddInventory}
            disabled={
              !newInventory.name.trim() ||
              !newInventory.vendor.trim() ||
              !newInventory.volume ||
              !newInventory.price ||
              !newInventory.inStock
            }
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg shadow transition-colors"
          >
            + Add Inventory
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">New Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Item Name
              </label>
              <input
                type="text"
                placeholder="Ex: Coke"
                value={newInventory.name}
                onChange={(e) =>
                  setNewInventory({ ...newInventory, name: e.target.value })
                }
                className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Vendor
              </label>
              <select
                value={newInventory.vendor}
                onChange={(e) =>
                  setNewInventory({ ...newInventory, vendor: e.target.value })
                }
                className="border text-gray-600 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Updates By
              </label>
              <select
                value={newInventory.updatesByEmp}
                onChange={(e) =>
                  setNewInventory({
                    ...newInventory,
                    updatesByEmp: e.target.value,
                  })
                }
                className="border text-gray-600 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Updates by?</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Enough
              </label>
              <select
                value={newInventory.enough}
                onChange={(e) =>
                  setNewInventory({ ...newInventory, enough: e.target.value })
                }
                className="border text-gray-600 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Need Purchase?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Volume / EA
              </label>
              <input
                type="number"
                placeholder="Ex: 24"
                value={newInventory.volume}
                onChange={(e) =>
                  setNewInventory({ ...newInventory, volume: e.target.value })
                }
                className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Unit
              </label>
              <select
                value={newInventory.unit}
                onChange={(e) =>
                  setNewInventory({ ...newInventory, unit: e.target.value })
                }
                className="border text-gray-600 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Unit</option>
                <option value="Kg">Kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
                <option value="mL">mL</option>
                <option value="ea">ea</option>
                <option value="lb">lb</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                EA/Case
              </label>
              <input
                type="number"
                placeholder="Ex: 24"
                value={newInventory.unitPerCase}
                onChange={(e) =>
                  setNewInventory({
                    ...newInventory,
                    unitPerCase: e.target.value,
                  })
                }
                className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Price
              </label>
              <input
                type="number"
                placeholder="Ex: 19.99"
                value={newInventory.price}
                onChange={(e) =>
                  setNewInventory({
                    ...newInventory,
                    price:
                      e.target.value === "" ? "" : parseFloat(e.target.value),
                  })
                }
                className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                In Stock Quantity
              </label>
              <input
                type="text"
                placeholder="Ex: 24"
                value={newInventory.inStock}
                onChange={(e) =>
                  setNewInventory({ ...newInventory, inStock: e.target.value })
                }
                className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
