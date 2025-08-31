import React, { useEffect, useState } from "react";
import API from "../../API/api";

export default function UserRecipe() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipe = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/recipe/getList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(res.data);
    } catch (error) {
      console.log("Failed to load Recipe List", error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-300 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-gray-50 p-5 rounded-xl shadow flex flex-col border border-gray-300"
            >
              <div className="flex items-center mb-3">
                <h3 className="text-xl font-bold">{recipe.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-2 border rounded p-2 bg-white">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
