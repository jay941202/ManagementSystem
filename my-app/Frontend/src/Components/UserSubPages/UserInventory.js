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

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/inventory/inventoryList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const UBE = res.data.filter((e) => e.updatesByEmp === true);
      console.log(UBE);
      setInventoryList(UBE);
    } catch (error) {
      console.error("Failed", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddInventory = async () => {
    const exists = inventoryList.some(
      (item) => item.name.toLowerCase() === newInventory.name.toLowerCase()
    );

    if (exists) {
      alert("Item Already Exist");
      return;
    }
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
      console.error("Failed to add", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-6xl rounded-2xl border-2 border-gray-300 p-8 space-y-10 shadow-lg bg-white">
        <h1 className="text-4xl font-bold text-center mb-6">
          Inventory Management
        </h1>

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
