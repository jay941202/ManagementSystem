import React, { useState } from "react";

export default function RecipeForm({ ingredientsList, handleSubmit }) {
  const [retailPrice, setRetailPrice] = useState(0);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", volume: "", unit: "" },
    { name: "", volume: "", unit: "" },
    { name: "", volume: "", unit: "" },
  ]);
  const sortedList = ingredientsList.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, { name: "", volume: "", unit: "" }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    handleSubmit(e, { name, retailPrice, ingredients });
    setRetailPrice(0);
    setName("");
    setIngredients([
      { name: "", volume: "", unit: "" },
      { name: "", volume: "", unit: "" },
      { name: "", volume: "", unit: "" },
    ]);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-md rounded-2xl p-6 mb-8"
    >
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Item"
          />
        </div>
        <div className="w-40">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Retail Price
          </label>
          <input
            type="number"
            value={retailPrice}
            onChange={(e) => setRetailPrice(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Price"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ingredients
        </label>
        {ingredients.map((ing, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <select
              value={ing.inventoryItem?._id || ""}
              onChange={(e) => {
                const selectedItem = ingredientsList.find(
                  (item) => item._id === e.target.value
                );
                handleIngredientChange(i, "inventoryItem", selectedItem);
              }}
              className="border px-3 py-2 rounded flex-1"
            >
              <option value="">Select Ingredient</option>
              {sortedList.map((inv) => (
                <option key={inv._id} value={inv._id}>
                  {inv.name}
                </option>
              ))}
            </select>
            <input
              value={ing.volume}
              onChange={(e) =>
                handleIngredientChange(i, "volume", e.target.value)
              }
              placeholder="Volume"
              className="border px-3 py-2 w-32 rounded"
            />
            <select
              value={ing.unit}
              onChange={(e) =>
                handleIngredientChange(i, "unit", e.target.value)
              }
              className="border px-3 py-2 rounded"
            >
              <option value="">Select Unit</option>
              <option value="g">g</option>
              <option value="mL">mL</option>
              <option value="ea">ea</option>
            </select>
          </div>
        ))}

        <button
          type="button"
          onClick={addIngredientField}
          className="py-2 text-blue-500 text-sm font-medium mt-2 hover:underline"
        >
          + Add Ingredient
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <button
          type="submit"
          className="bg-twohas hover:bg-gray-600 text-white text-lg font-semibold px-3 py-1 rounded-md shadow-sm transition"
        >
          Add Recipe
        </button>
      </div>
    </form>
  );
}
