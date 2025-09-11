import React from "react";
import UserInventoryForm from "./InventoryComponents/UserInventoryForm";
import UserInventoryTable from "./InventoryComponents/UserInventoryTable";
import { useState, useEffect } from "react";
import API from "../../API/api";

export default function UserInventory() {
  const [newInventory, setNewInventory] = useState({
    name: "",
    inStock: "",
  });
  const [inventoryList, setInventoryList] = useState([]);
  const [isOn, setIsOn] = useState([]);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/inventory/inventoryList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      isOn
        ? setInventoryList(res.data.filter((e) => e.updatesByEmp === "Staff"))
        : setInventoryList(
            res.data.filter((e) => e.updatesByEmp === "Kitchen")
          );
    } catch (error) {
      console.error("Failed", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [isOn]);

  const handleAddInventory = async () => {
    try {
      const payload = {
        ...newInventory,
        volume: Number(newInventory.volume) || 0,
        price: Number(newInventory.price) || 0,
      };
      const token = localStorage.getItem("token");
      await API.post("/inventory/addInventory", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewInventory({ name: "", inStock: "" });
      await fetchInventory();
    } catch (error) {
      if (error.response?.status === 400) {
        alert("Item already exists in database");
      } else {
        console.error("Failed to add", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-6xl rounded-2xl border-2 border-gray-300 p-8 space-y-10 shadow-lg bg-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold">Inventory Management</h1>
          <label className="flex items-center cursor-pointer gap-3">
            <span className="font-medium text-gray-700">
              {isOn ? "Staff" : "Kitchen"}
            </span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isOn}
                onChange={() => setIsOn(!isOn)}
              />
              <div className="w-16 h-8 bg-gray-300 rounded-full bg-red-500 peer-checked:bg-blue-500 transition-all duration-300"></div>
              <div className="absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-8"></div>
            </div>
          </label>
        </div>
        <div className="p-6 rounded-xl border-2 border-gray-300 shadow-inner">
          <UserInventoryForm
            newInventory={newInventory}
            setNewInventory={setNewInventory}
            handleAddInventory={handleAddInventory}
          />
        </div>

        <div className="p-6 rounded-xl border-2 border-gray-300 shadow-inner">
          <h2 className="text-3xl font-semibold mb-4">Inventory List</h2>
          <UserInventoryTable
            inventoryList={inventoryList}
            fetchInventory={fetchInventory}
          />
        </div>
      </div>
    </div>
  );
}
