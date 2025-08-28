import React from "react";
import API from "../../../API/api";

export default function RecipeTable({
  recipes,
  setEditingId,
  editedRecipe,
  setEditedRecipe,
  editingId,
  fetchRecipe,
  ingredientsList,
}) {
  const handleEdit = (recipe) => {
    setEditingId(recipe._id);
    setEditedRecipe(recipe);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete("/recipe/deleteRecipe", {
        headers: { Authorization: `Bearer ${token}` },
        data: { id: id },
      });
      await fetchRecipe();
    } catch (error) {
      console.error("Failed to Delete", error);
    }
  };

  const handleIngredientChange = (_id, field, value) => {
    const newIngredients = editedRecipe.ingredients.map((ing) => {
      if (ing._id === _id) {
        if (field === "inventoryItem") {
          return { ...ing, inventoryItem: value };
        } else {
          return { ...ing, [field]: value };
        }
      }
      return ing;
    });
    setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
  };

  const addIngredientField = () => {
    setEditedRecipe({
      ...editedRecipe,
      ingredients: [
        ...editedRecipe.ingredients,
        { _id: Date.now(), inventoryItem: null, volume: "" },
      ],
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        id: editedRecipe._id,
        name: editedRecipe.name,
        ingredients: editedRecipe.ingredients.map((ing) => ({
          inventoryItem: ing.inventoryItem._id,
          volume: ing.volume,
        })),
      };
      await API.put(`/recipe/updateRecipe/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchRecipe();
      setEditingId(null);
    } catch (err) {
      console.error("Failed to save recipe", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className="bg-white p-5 rounded-xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition"
        >
          {editingId === recipe._id ? (
            <>
              <input
                type="text"
                value={editedRecipe.name}
                onChange={(e) =>
                  setEditedRecipe({ ...editedRecipe, name: e.target.value })
                }
                className="border px-3 py-2 rounded mb-3 w-full font-semibold text-lg"
                placeholder="Recipe Name"
              />
              <div className="grid gap-3 mb-3">
                {editedRecipe.ingredients.map((ing) => (
                  <div key={ing._id} className="flex gap-2 items-center">
                    <select
                      value={ing.inventoryItem?._id || ""}
                      onChange={(e) => {
                        const selectedItem = ingredientsList.find(
                          (item) => item._id === e.target.value
                        );
                        handleIngredientChange(
                          ing._id,
                          "inventoryItem",
                          selectedItem
                        );
                      }}
                      className="border px-2 py-1 rounded flex-1"
                    >
                      <option value="">Select ingredient</option>
                      {ingredientsList.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <input
                      value={ing.volume || ""}
                      onChange={(e) =>
                        handleIngredientChange(
                          ing._id,
                          "volume",
                          e.target.value
                        )
                      }
                      className="border px-2 py-1 rounded w-20"
                      placeholder="Vol"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addIngredientField}
                className="py-1 text-blue-500 text-sm font-medium hover:underline mb-3"
              >
                + Add Ingredient
              </button>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleSave}
                  disabled={
                    !editedRecipe.name ||
                    editedRecipe.ingredients.some(
                      (ing) => !ing.inventoryItem?._id || !ing.volume
                    )
                  }
                  className={`bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-md shadow transition ${
                    !editedRecipe.name ||
                    editedRecipe.ingredients.some(
                      (ing) => !ing.inventoryItem?._id || !ing.volume
                    )
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-md shadow transition"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold">{recipe.name}</h3>
                <div className="flex flex-col text-right">
                  <span className="text-sm text-gray-500">
                    Retail: ${recipe.retailPrice?.toFixed(2) || 0}
                  </span>
                  <span className="text-sm text-gray-500">
                    COG: ${recipe.costOfGood?.toFixed(2) || 0}
                  </span>
                  <span className="text-sm text-gray-500">
                    Margin:{" "}
                    {recipe.margin ? (recipe.margin * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 border rounded p-2 bg-gray-50">
                {recipe.ingredients.map((ing) => (
                  <React.Fragment key={ing._id}>
                    <span className="bg-gray-200 rounded px-2 py-1 text-sm">
                      {ing.inventoryItem?.name || "No Name"}
                    </span>
                    <span className="bg-gray-100 rounded px-2 py-1 text-sm text-right">
                      {ing.volume || 0}
                    </span>
                  </React.Fragment>
                ))}
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleEdit(recipe)}
                  className="bg-twohas hover:bg-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-md shadow transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="bg-twohas hover:bg-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-md shadow transition"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
