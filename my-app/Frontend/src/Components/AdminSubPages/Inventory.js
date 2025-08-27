import React, { useEffect, useState } from "react";
import API from "../../API/api";
import InventoryTable from "../InventoryComponents/InventoryTable";
import InventoryForm from "../InventoryComponents/InventoryForm";

export default function Inventory() {
  const [newInventory, setNewInventory] = useState({
    name: "",
    vendor: "",
    volume: "",
    price: "",
    inStock: "",
  });
  const [inventoryList, setInventoryList] = useState([]);
  useEffect(() => {
    fetchInventory();
  }, []);

  const calcUnitPrice = (price, volume) => {
    if (!price || !volume) return "-";
    const match = String(volume).match(/\d+/);
    if (!match) return "-";
    const qty = parseInt(match[0], 10);
    return `$${(price / qty).toFixed(2)}`;
  };
  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/inventory/inventoryList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInventoryList(res.data);
    } catch (error) {
      console.error("Failed", error);
    }
  };

  const handleAddInventory = async () => {
    const exists = inventoryList.some(
      (item) =>
        item.name.toLowerCase() === newInventory.name.toLowerCase() &&
        item.vendor.toLowerCase() === newInventory.vendor.toLowerCase()
    );

    if (exists) {
      alert("Item Already Exist");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await API.post("/inventory/addInventory", newInventory, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewInventory({
        name: "",
        vendor: "",
        volume: "",
        price: "",
        inStock: "",
      });
      await fetchInventory();
    } catch (error) {
      console.error("Failed to add", error);
    }
  };
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 bg-gray-50 min-h-screen">
      <InventoryForm
        newInventory={newInventory}
        setNewInventory={setNewInventory}
        handleAddInventory={handleAddInventory}
      />
      <InventoryTable
        inventoryList={inventoryList}
        calcUnitPrice={calcUnitPrice}
      />
    </div>
  );
}
