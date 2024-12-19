"use client";

import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/helper";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsStars } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { GrSearchAdvanced } from "react-icons/gr";
import { RiRefreshLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";

export default function Home() {
  const [randomRecipes, setRandomRecipes] = useState<any[]>([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState<any[]>([]);
  const [showRandomRecipes, setShowRandomRecipes] = useState(false);
  const pageNo = useRef(0);
  const { user } = useUser();

  const fetchRandomRecipes = async () => {
    const response = await Recipe.getRandomRecipe();
    setRandomRecipes(response?.recipes);
  };

  const fetchRecommendedRecipes = async () => {
    const recipes = await Recipe.getRecommendedRecipes(
      pageNo.current,
      user?.unsafeMetadata?.preference
    );
    setRecommendedRecipes((prev) => prev.concat(recipes));
    pageNo.current++;
  };

  const openRandomRecipes = async () => {
    if (randomRecipes.length == 0) {
      fetchRandomRecipes();
    }
    setShowRandomRecipes(true);
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.preference) fetchRecommendedRecipes();
    console.log(user?.unsafeMetadata);
  }, [user]);

  return (
    <div className="my-8 px-10 text-center">
      {/* WELCOME SECTION WITH INVITATION TO DISCOVER PAGE */}
      <div className="flex justify-between items-center px-20 py-14">
        <div>
          <h1 className="text-4xl">
            Welcome back <b className="text-yel">Chief !</b>
          </h1>
          <h2 className="text-xl font-mono italic my-5">
            Explore thousands of recipes to ignite your culinary passion!
          </h2>
          <div className="my-7 shadow-lg shadow-gray-700 bg-gray-700 py-3 px-6 rounded-2xl">
            <p className="font-medium text-xl">
              Discover Meals/Snacks/Deserts that fits your preferences only in{" "}
              <b className="text-yel text-2xl">Flav'Ur !</b>{" "}
            </p>
            <p className="text-gray-400 my-2">
              Explore thousands of recipes by name, meal types, diet and others
              with detailed nutritional information
            </p>
            <Link
              href="/discover"
              className="flex my-3 justify-center w-1/2 mx-auto font-semibold items-center gap-5 hover:scale-105 transition-all duration-300 text-gray-900 p-4 rounded-full text-2xl bg-yel"
            >
              <span>Discover yours</span>
              <GrSearchAdvanced className="text-3xl" />
            </Link>
          </div>
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
              className="flex cursor-pointer shadow-yel hover:shadow-md font-semibold items-center gap-2 hover:scale-105 transition-all duration-300 text-gray-900 p-4 rounded-full text-2xl bg-yel"
              onClick={() => openRandomRecipes()}
            >
              <span>Generate Recipes</span>
              <BsStars />
            </div>
          )}
        </div>
        {showRandomRecipes && (
          <div>
            <div className="w-full border-t my-8 border-gray-400"></div>

            <div className="overflow-auto whitespace-nowrap scrollbar-hidden">
              <div className="flex gap-10 w-[110vw]">
                {randomRecipes?.map((recipe, index) => (
                  <RecipeCard
                    recipeItem={recipe}
                    key={recipe?.id}
                    cardWidth="w-[19vw]"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SIMPLE RECCOMENDED RECIPES BASED ON PREFERENCES */}
      <div className="my-10 p-2 pb-5 rounded-xl border-r border-l border-yel ">
        <p className="text-3xl font-semibold text-gray-200 mb-10">
          <span className="text-yel">Today's </span>
          recipes just for you
        </p>
        <div className="flex flex-wrap gap-8 px- justify-center">
          {recommendedRecipes?.map((recipe, index) => (
            <RecipeCard
              recipeItem={recipe}
              key={recipe?.id}
              cardWidth="w-[270px]"
            />
          ))}
        </div>
        <div
          className="text-2xl cursor-pointer flex items-center justify-center text-yel border border-yel hover:bg-yel hover:text-dark hover:scale-110 transition-all rounded-xl w-40 mx-auto p-2 mt-5"
          onClick={() => fetchRecommendedRecipes()}
        >
          <p>More</p>
          <CiSquarePlus className="text-4xl" />
        </div>
      </div>
    </div>
  );
}
