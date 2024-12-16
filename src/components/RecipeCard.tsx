import { getRating, getTime, truncateText } from "@/helper";
import { store } from "@/store";
import { Tooltip } from "antd";
import React from "react";
import Recipe from "@/helper/recipe";
import { BiFoodTag } from "react-icons/bi";
import { FaClock, FaStar } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { MdHealthAndSafety } from "react-icons/md";
import { TbBowlSpoonFilled } from "react-icons/tb";
import { FaClockRotateLeft } from "react-icons/fa6";
import moment from "moment";

const RecipeCard = ({ recipeItem, isRecent }: any) => {
  const addRecentItem = async () => {
    try {
      const response = await Recipe.addRecentRecipe({
        id: recipeItem.id,
        image: recipeItem?.image,
        title: recipeItem?.title,
        servings: recipeItem?.servings,
        readyInMinutes: recipeItem?.readyInMinutes,
        spoonacularScore: recipeItem?.spoonacularScore,
        vegetarian: recipeItem?.vegetarian,
        healthScore: recipeItem?.healthScore,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="!w-[60rem] bg-gray-800 rounded-lg pb-4">
      <img
        src={recipeItem?.image}
        alt={recipeItem?.title}
        className="rounded-t-lg w-[20vw]"
      />
      <div className="px-3 py-2">
        <Tooltip
          title={recipeItem?.title?.length > 20 ? recipeItem.title : ""}
          color="#2b3348"
          className="cursor-pointer text-lg font-semibold text-gray-200"
          overlayStyle={{ maxWidth: "200px" }} // Optional: Set max width for the tooltip
          placement="top" // Optional: Adjust placement
        >
          {truncateText(recipeItem?.title, 20)}
        </Tooltip>
        <div className="flex justify-between items-center text-lg my-2 text-gray-400">
          <div className="flex items-center gap-2">
            <FaClock className="text-blue-600" />
            <span>{getTime(recipeItem?.readyInMinutes)}</span>
          </div>
          <div className="flex items-center gap-2">
            <TbBowlSpoonFilled className="text-green-600" />
            <span>{recipeItem?.servings} servings</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-lg my-2 text-gray-400">
          <div className="flex items-center gap-2 text-gray-400">
            <MdHealthAndSafety className="text-green-400" />
            <span>Health Score: {recipeItem?.healthScore}</span>
          </div>

          <div
            className={
              "flex items-center gap-1 text-gray-400 " +
              (recipeItem?.vegetarian == false && "line-through")
            }
          >
            <BiFoodTag
              className={
                recipeItem?.vegetarian ? "text-green-500" : "text-red-500"
              }
            />
            Veg
          </div>
        </div>

        <div className="flex gap-1 justify-center text-lg text-gray-400">
          Rating :<span>{getRating(recipeItem?.spoonacularScore)}</span>
          <div className="relative inline-block text-2xl w-6 h-6">
            {/* Unfilled star */}
            <FaStar className="text-gray-600 absolute top-0 left-0 w-full h-full" />
            {/* Filled star */}
            <FaStar
              className="absolute top-0 left-0 text-yellow-500 w-full h-full overflow-hidden"
              style={{
                clipPath: `inset(${100 - recipeItem?.spoonacularScore}% 0 0 0)`, // Clip partially based on percentage
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="mt-4 w-3/4 bg-yellow-500 hover:bg-yellow-600 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors"
          onClick={() => addRecentItem()}
        >
          View Recipe
        </button>

        {isRecent && (
          <div className="flex items-center gap-1 text-gray-400 justify-center mt-2">
            <FaClockRotateLeft />
            {moment(recipeItem?.updatedAt)?.fromNow()}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
