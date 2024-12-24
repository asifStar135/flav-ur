"use client";

import { Recipe } from "@/helper";
import React, { useEffect, useState } from "react";

const page = ({ params }: any) => {
  const [recipeInfo, setRecipeInfo] = useState<any>(null);

  //   useEffect(() => {
  //     if (!recipeInfo) {
  //       Recipe?.getRecipeInformation(params?.recipeId).then((recipeInfo) =>
  //         setRecipeInfo(recipeInfo)
  //       );
  //     }
  //   }, [recipeInfo]);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative mb-8">
          <img
            src="recipe-banner.jpg"
            alt="Recipe Banner"
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold mb-2">Recipe Name</h1>
            <p className="text-lg">
              by <span className="font-semibold">Author Name</span>
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 text-white p-6 rounded-lg">
              <img
                src="recipe-image.jpg"
                alt="Recipe"
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold">Servings:</span> 4
                </li>
                <li>
                  <span className="font-semibold">Prep Time:</span> 20 mins
                </li>
                <li>
                  <span className="font-semibold">Cook Time:</span> 40 mins
                </li>
                <li>
                  <span className="font-semibold">Difficulty:</span> Medium
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Ingredients Card */}
            <div className="bg-gray-800 text-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>2 cups of flour</li>
                <li>1 cup of sugar</li>
                <li>½ cup of milk</li>
                <li>3 eggs</li>
                {/* Add more */}
              </ul>
            </div>

            {/* Steps Card */}
            <div className="bg-gray-800 text-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Steps</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Preheat the oven to 180°C.</li>
                <li>Mix all dry ingredients in a bowl.</li>
                <li>Add wet ingredients and stir until smooth.</li>
                <li>Bake for 30 minutes or until golden brown.</li>
                {/* Add more */}
              </ol>
            </div>

            {/* Nutrition Card */}
            <div className="bg-gray-800 text-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                Nutritional Information
              </h2>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-left">Nutrient</th>
                    <th className="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Calories</td>
                    <td className="text-right">350 kcal</td>
                  </tr>
                  <tr>
                    <td>Protein</td>
                    <td className="text-right">10 g</td>
                  </tr>
                  <tr>
                    <td>Fat</td>
                    <td className="text-right">15 g</td>
                  </tr>
                  <tr>
                    <td>Carbs</td>
                    <td className="text-right">50 g</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Related Recipe Cards */}
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <img
                src="related-recipe-1.jpg"
                alt="Related Recipe"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">Related Recipe 1</h3>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <img
                src="related-recipe-2.jpg"
                alt="Related Recipe"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">Related Recipe 2</h3>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <img
                src="related-recipe-3.jpg"
                alt="Related Recipe"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">Related Recipe 3</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
