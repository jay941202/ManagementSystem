import React, { useEffect, useState } from "react";
import RecipeForm from "./RecipeComponents/RecipeForm";
import RecipeTable from "./RecipeComponents/RecipeTable";
import API from "../../API/api";

export default function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedRecipe, setEditedRecipe] = useState(null);

  const fetchRecipe = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/recipe/getList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(res.data);
    } catch (error) {
      console.error("Failed to load Recipe List", error);
    }
  };
  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/inventory/inventoryList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInventoryList(res.data);
    } catch (error) {
      console.error("Failed to load InventoryList", error);
    }
  };
  useEffect(() => {
    fetchRecipe();
    fetchInventory();
  }, []);
  const handleSubmit = async (e, recipeData) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const selectedIngredients = recipeData.ingredients.filter(
        (ing) => ing.inventoryItem
      );

      const payload = {
        name: recipeData.name,
        retailPrice: parseFloat(recipeData.retailPrice),
        ingredients: selectedIngredients.map((ing) => ({
          inventoryItem: ing.inventoryItem._id,
          volume: ing.volume,
          unitPrice: ing.inventoryItem.unitPrice,
        })),
      };

      await API.post("/recipe/addRecipe", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchRecipe();
    } catch (err) {
      console.error("Failed to add recipe", err);
    }
  };
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Recipe Manager</h2>
      <RecipeForm handleSubmit={handleSubmit} ingredientsList={inventoryList} />
      <RecipeTable
        recipes={recipes}
        editingId={editingId}
        setEditingId={setEditingId}
        editedRecipe={editedRecipe}
        setEditedRecipe={setEditedRecipe}
        fetchRecipe={fetchRecipe}
        ingredientsList={inventoryList}
      />
    </div>
  );
}
