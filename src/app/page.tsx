"use client";

import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/helper";
import { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import { RiRefreshLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";

export default function Home() {
  const [randomRecipes, setRandomRecipes] = useState<any[]>([]);
  const [showRandomRecipes, setShowRandomRecipes] = useState(false);

  const fetchRandomRecipes = async () => {
    const response = await Recipe.getRandomRecipe();
    setRandomRecipes(response!.recipes);
    console.log(response?.recipes);
  };

  const openRandomRecipes = async () => {
    if (randomRecipes.length == 0) {
      fetchRandomRecipes();
    }
    setShowRandomRecipes(true);
  };

  return (
    <div className="my-8 px-10 text-center">
      {/* WELCOME SECTION  */}
      <div className="flex justify-between items-center px-20 py-14">
        <div>
          <h1 className="text-4xl mb-10">
            Welcome back <b className="text-yel">Chief !</b>
          </h1>
          <h2 className="text-xl font-mono italic">
            Explore thousands of recipes to ignite your culinary passion!
          </h2>
        </div>
        <img
          src="/assets/cook.png"
          alt=""
          className="w-52 rounded-full mx-28"
        />
      </div>

      {/* RANDOM RECIPE GENERATOR */}
      <div className="bg-gray-700 px-16 py-10 mx-20 rounded-2xl">
        <div className=" flex justify-between items-center">
          <div>
            <p className="text-lg">
              Want to explore new delights in the kitchen? 🍳✨ We got your back
              ✅
            </p>
            <h2 className="text-2xl my-3">
              Try some Random Recipes by{" "}
              <b className="text-yel italic">Flav'Ur</b>{" "}
            </h2>
          </div>
          {showRandomRecipes ? (
            <div className="flex justify-center gap-5">
              <div
                className="flex items-center gap-3 text-xl cursor-pointer border border-yel text-yel p-2 rounded-2xl"
                onClick={() => fetchRandomRecipes()}
              >
                Regenerate
                <RiRefreshLine className="text-3xl" />
              </div>
              <div
                className="flex items-center gap-2 text-xl cursor-pointer border-2 border-gray-500 text-gray-400 p-2 rounded-2xl"
                onClick={() => setShowRandomRecipes(false)}
              >
                <RxCrossCircled className="text-2xl" />
                Close
              </div>
            </div>
          ) : (
            <div
              className="flex cursor-pointer hover:shadow-yel hover:shadow-md font-semibold items-center gap-2 hover:scale-105 transition-all duration-300 text-gray-900 p-4 rounded-full text-2xl bg-yel"
              onClick={() => openRandomRecipes()}
            >
              <span>Generate Recipes</span>
              <BsStars />
            </div>
          )}
        </div>
        {showRandomRecipes && (
          <div>
            <div className="w-full border-t rounded-full my-8 border-gray-400"></div>

            <div className="overflow-auto whitespace-nowrap scrollbar-hidden">
              <div className="flex gap-10 w-[100vw]">
                {randomRecipes.map((recipe, index) => (
                  <RecipeCard recipeItem={recipe} key={recipe?.id} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
