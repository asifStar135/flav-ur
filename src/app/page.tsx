"use client";

import Loader from "@/components/Loader";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/services";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsStars } from "react-icons/bs";
import { GrSearchAdvanced } from "react-icons/gr";
import { RiRefreshLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";

export default function Home() {
  const { user } = useUser();
  const [randomRecipes, setRandomRecipes] = useState<any[]>([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState<any[]>([]);
  const [showRandomRecipes, setShowRandomRecipes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pageNo = useRef(0);
  const divRef = useRef(null);

  const fetchRandomRecipes = async () => {
    setIsLoading(true);
    const response = await Recipe.getRandomRecipe();
    setRandomRecipes(response?.recipes);
    setIsLoading(false);
  };

  const fetchRecommendedRecipes = async () => {
    if (!user?.unsafeMetadata?.preference) return;
    pageNo.current++;
    const recipes = await Recipe.getRecommendedRecipes(
      pageNo.current - 1,
      user?.unsafeMetadata?.preference
    );
    setRecommendedRecipes((prev) => prev.concat(recipes));
    if (recipes?.length < 10) pageNo.current = -1;
  };

  const openRandomRecipes = async () => {
    if (randomRecipes.length == 0) {
      fetchRandomRecipes();
    }
    setShowRandomRecipes(true);
  };

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchRecommendedRecipes();
        }
      },
      { threshold: 1 }
    );

    const currentRef = divRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isLoading]);

  return (
    <div className="my-8 px-5 lg:px-10 text-center">
      {/* WELCOME SECTION WITH INVITATION TO DISCOVER PAGE */}
      <div className="xl:flex justify-between items-center xl:px-20 py-14">
        <div>
          <h1 className="text-4xl">
            Welcome back <b className="text-yel">Chief !</b>
          </h1>
          <h2 className="text-lg xl:text-xl text-gray-300 font-mono italic my-5">
            Explore thousands of recipes to ignite your culinary passion!
          </h2>
          <div className="my-7 shadow-lg shadow-gray-700 bg-gray-700 py-3 px-6 rounded-2xl">
            <p className="font-medium text-lg xl:text-xl">
              Discover Meals/Snacks/Deserts that fits your preferences only in{" "}
              <b className="text-yel text-2xl">Flav'Ur !</b>{" "}
            </p>
            <p className="text-gray-400 my-2">
              Explore thousands of recipes by name, meal types, diet and others
              with detailed nutritional information
            </p>
            <Link
              href="/discover"
              className="flex my-3 justify-center w-3/4 xl:w-1/2 mx-auto font-semibold items-center gap-5 hover:scale-105 transition-all duration-300 text-gray-900 p-4 rounded-full text-2xl bg-yel"
            >
              <span>Discover yours</span>
              <GrSearchAdvanced className="text-3xl" />
            </Link>
          </div>
        </div>
        <img
          src="/assets/cook.png"
          alt=""
          className="w-52 rounded-full mx-auto"
        />
      </div>

      {/* RANDOM RECIPE GENERATOR */}
      <div className="bg-gray-700 px-5 lg:px-16 py-10 lg:mx-20 rounded-2xl">
        <div className="flex flex-col xl:flex-row justify-between items-center">
          <div>
            <p className="text-lg">
              Want to explore new delights in the kitchen? 🍳✨ We got your back
              ✅
            </p>
            <h2 className="text-xl xl:text-2xl my-3 font-semibold">
              Try some Random Recipes by{" "}
              <b className="text-yel italic">Flav'Ur</b>{" "}
            </h2>
          </div>
          {showRandomRecipes ? (
            <div className="flex justify-center gap-5 self-center">
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
              className="flex self-center cursor-pointer shadow-yel hover:shadow-md font-semibold items-center gap-2 hover:scale-105 transition-all duration-300 text-gray-900 p-4 rounded-full text-2xl bg-yel"
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
            {isLoading ? (
              <Loader />
            ) : (
              <div>
                <div className="overflow-auto whitespace-nowrap scrollbar-hidden">
                  <div className="flex gap-4 xl:gap-10 xl:w-[110vw]">
                    {randomRecipes?.map((recipe, index) => (
                      <RecipeCard
                        recipeItem={recipe}
                        key={index}
                        cardWidth="w-[270px] xl:w-[19vw]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SIMPLE RECCOMENDED RECIPES BASED ON PREFERENCES */}
      <div className="my-10 pb-5">
        <p className="text-3xl font-semibold text-gray-200 mb-10">
          <span className="text-yel">Today's </span>
          recipes just for you
        </p>
        <div className="flex flex-wrap gap-3 xl:gap-8 justify-evenly xl:justify-center">
          {recommendedRecipes?.length > 0
            ? recommendedRecipes?.map((recipe, index) => (
                <RecipeCard
                  recipeItem={recipe}
                  key={recipe?.id}
                  cardWidth="w-[160px] xl:w-[270px]"
                />
              ))
            : null}
        </div>
        {pageNo.current == -1 ? (
          <h2 className="text-gray-500 mt-5 text-center text-2xl">
            {"-- End of the List --"}
          </h2>
        ) : (
          <div ref={divRef}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
