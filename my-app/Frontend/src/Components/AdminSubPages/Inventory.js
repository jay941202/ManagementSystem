import React, { useEffect, useState } from "react";
import API from "../../API/api";
import InventoryTable from "./InventoryComponents/InventoryTable";
import InventoryForm from "./InventoryComponents/InventoryForm";
import TableForShopping from "./InventoryComponents/TableForShopping";

export default function Inventory() {
  const [newInventory, setNewInventory] = useState({
    name: "",
    vendor: "",
    volume: "",
    price: "",
    inStock: "",
    updatesByEmp: "",
    enough: false,
    unit: "",
    unitPerCase: 1,
  });
  const [inventoryList, setInventoryList] = useState([]);
  const [isOn, setIsOn] = useState(true);
  const [inventoryOnly, setInventoryOnly] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

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
        updatesByEmp: false,
      });
      await fetchInventory();
    } catch (error) {
      console.error("Failed to add", error);
    }
  };

  const groupedByVendor = inventoryList.reduce((acc, item) => {
    if (!item.vendor || (isOn && item.enough === true)) return acc;
    if (!acc[item.vendor]) acc[item.vendor] = [];
    acc[item.vendor].push(item);
    return acc;
  }, {});

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 bg-gray-50 min-h-screen">
      <InventoryForm
        newInventory={newInventory}
        setNewInventory={setNewInventory}
        handleAddInventory={handleAddInventory}
        isOn={isOn}
        setIsOn={setIsOn}
        inventoryOnly={inventoryOnly}
        setInventoryOnly={setInventoryOnly}
      />

      {!inventoryOnly
        ? Object.entries(groupedByVendor).map(([vendor, items]) => (
            <div key={vendor}>
              <h2 className="text-2xl font-bold mb-4">{vendor}</h2>
              <InventoryTable
                inventoryList={items}
                fetchInventory={fetchInventory}
              />
            </div>
          ))
        : Object.entries(groupedByVendor).map(([vendor, items]) => (
            <div key={vendor}>
              <h2 className="text-2xl font-bold mb-4">{vendor}</h2>
              <TableForShopping
                inventoryList={items}
                fetchInventory={fetchInventory}
                isOn={isOn}
              />
            </div>
          ))}
    </div>
  );
}
