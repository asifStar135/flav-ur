"use client";

import { collapseSummary, getRating, Recipe, truncateText } from "@/helper";
import { demoRecipe } from "@/helper/temp";
import { Rate, Tag, Tooltip } from "antd";
import { use, useEffect, useState } from "react";
import { BiFoodTag, BiSolidLike } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { FaGrinHearts } from "react-icons/fa";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { LuMilkOff } from "react-icons/lu";
import { MdHealthAndSafety } from "react-icons/md";
import { PiBowlFood } from "react-icons/pi";
import { TbBowlSpoonFilled, TbCircleDotFilled } from "react-icons/tb";

export default function Page({ params }: { params: any }) {
  const { id: recipeId } = use(params);
  const [recipe, setRecipe] = useState<any>({});
  const [expandSummary, setExpandSummary] = useState(false);
  const [recipeTags, setRecipeTags] = useState<any[]>([]);

  useEffect(() => {
    if (recipeId)
      Recipe?.getRecipeInformation(recipeId).then((recipeInformation) => {
        setRecipe(recipeInformation);
        console.log(recipeInformation);
      });
  }, [recipeId]);

  useEffect(() => {
    let arr = [];
    if (recipe?.vegetarian)
      arr.push({
        tag: "Veg",
        icon: BiFoodTag,
        color: "#4ade80",
      });
    else
      arr.push({
        tag: "Non-Veg",
        icon: BiFoodTag,
        color: "#f87171",
      });
    if (recipe?.veryHealthy)
      arr.push({
        tag: "Healthy",
        icon: MdHealthAndSafety,
        color: "#60a5fa",
      });
    if (recipe?.glutenFree)
      arr.push({
        tag: "Gluten Free",
        icon: PiBowlFood,
        color: "#fbbf24",
      });
    if (recipe?.dairyFree)
      arr.push({
        tag: "Dairy Free",
        icon: LuMilkOff,
        color: "#2dd4bf",
      });
    if (recipe?.cheap)
      arr.push({
        tag: "Cheap",
        icon: GiTakeMyMoney,
        color: "#fb923c",
      });
    if (recipe?.veryPopular)
      arr.push({
        tag: "Popular",
        icon: FaGrinHearts,
        color: "#fb7185",
      });
    setRecipeTags(arr);

    console.log(recipe);
  }, [recipe]);

  return (
    <div>
      <div className="flex w-5/6 mx-auto justify-between my-10">
        <div className="bg-gray-800 self-start rounded-xl shadow shadow-gray-800 w-1/3">
          <img
            src={recipe?.image}
            className="rounded-lg self-start"
            alt="Recipe image"
          />
          <div className="p-3 px-5">
            <div className="flex gap-5 justify-center items-center">
              <div className="flex items-center gap-3 font-semibold justify-center text-yel text-2xl">
                <span>{getRating(recipe?.spoonacularScore)} </span>
                <Rate
                  defaultValue={getRating(recipe?.spoonacularScore)}
                  disabled
                  allowHalf
                />
              </div>
              <span className="font-semibold text-xl">
                <BiSolidLike className="inline text-2xl text-yel" />{" "}
                <span className="text-yel">{recipe?.aggregateLikes}</span>
              </span>
            </div>
            <p className="text-xl mt-3 text-gray-300">
              Ready in{" "}
              <span className=" text-yel">
                {recipe.readyInMinutes} Mins <BsClock className="inline" />{" "}
              </span>
            </p>
            <p className="text-xl text-gray-300">
              Contains{" "}
              <span className=" text-yel">
                {recipe.servings} servings{" "}
                <TbBowlSpoonFilled className="inline" />{" "}
              </span>
            </p>
            <p className="text-xl mb-3 text-gray-300">
              Health score{" "}
              <span className=" text-yel">
                {recipe.healthScore} points{" "}
                <MdHealthAndSafety className="inline" />{" "}
              </span>
            </p>
            <div>
              <hr />
              <div className="my-5 flex items-center gap-2">
                <FaMagnifyingGlassLocation className="text-yel text-2xl mr-2" />
                {recipe?.cuisines?.length ? (
                  recipe?.cuisines.slice(0, 3).map((cuisine: any) => (
                    <Tag
                      key={cuisine}
                      className="border border-gray-300 text-lg m-0 bg-gray-700"
                    >
                      {cuisine}
                    </Tag>
                  ))
                ) : (
                  <p className="text-lg text-gray-400 text-center">
                    - No related cuisines -
                  </p>
                )}
                {recipe?.cuisines?.length > 3 && (
                  <Tooltip
                    color="#2b3348"
                    overlayClassName="w-92"
                    overlay={
                      <div className="flex flex-wrap gap-2">
                        {recipe?.cuisines.slice(3).map((cuisine: any) => (
                          <Tag
                            key={cuisine}
                            className="border border-gray-300 text-lg bg-gray-700 m-0"
                          >
                            {cuisine}
                          </Tag>
                        ))}
                      </div>
                    }
                  >
                    <Tag className="border border-gray-300 text-base self-center bg-gray-700 cursor-pointer">
                      + {recipe?.cuisines?.length - 3}...
                    </Tag>
                  </Tooltip>
                )}
              </div>
              {/* <hr /> */}
              <div className="my-5 flex items-center gap-2">
                <IoFastFood className="text-yel text-2xl mr-2" />
                {recipe?.dishTypes?.length ? (
                  recipe.dishTypes.slice(0, 3).map((dish: any) => (
                    <Tag
                      key={dish}
                      className="border border-gray-300 text-lg m-0 bg-gray-700"
                    >
                      {dish}
                    </Tag>
                  ))
                ) : (
                  <p className="text-lg text-gray-400 text-center">
                    - No dish type is available -
                  </p>
                )}
                {recipe.dishTypes?.length > 3 && (
                  <Tooltip
                    color="#2b3348"
                    overlayClassName="w-92"
                    overlay={
                      <div className="flex flex-wrap gap-2">
                        {recipe.dishTypes.slice(3).map((dish: any) => (
                          <Tag
                            key={dish}
                            className="border border-gray-300 text-lg m-0 bg-gray-700"
                          >
                            {dish}
                          </Tag>
                        ))}
                      </div>
                    }
                  >
                    <Tag className="border border-gray-300 text-base self-center bg-gray-700 cursor-pointer">
                      + {recipe?.dishTypes?.length - 3}...
                    </Tag>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5 self-start">
          <div>
            <div className="flex gap-3 mb-2">
              {recipeTags?.map((tag) => (
                <div
                  key={tag.tag}
                  className="p-1 px-2 text-base gap-1 flex items-center rounded-lg border"
                  style={{
                    color: tag.color,
                    borderColor: tag.color,
                  }}
                >
                  <tag.icon className="text-lg" />
                  <span>{tag?.tag}</span>
                </div>
              ))}
            </div>
            <h1 className="text-3xl font-semibold mb-3">{recipe?.title}</h1>
            <div className="">
              <span
                className="text-base text-gray-400 recipe-summary"
                dangerouslySetInnerHTML={{
                  __html: expandSummary
                    ? recipe?.summary
                    : collapseSummary(recipe?.summary),
                }}
              >
                {null}
              </span>{" "}
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={() => setExpandSummary(!expandSummary)}
              >
                See {expandSummary ? "less" : "more"}
              </span>
            </div>
          </div>
          <div className="bg-gray-800 px-5 py-3 rounded-lg mt-5">
            <p className="font-semibold text-2xl text-center mb-5">
              Ingredients You Need
            </p>
            <div className="grid grid-cols-4 gap-2">
              {recipe?.extendedIngredients?.map(
                (ingredient: any, index: number) => (
                  <div className="flex items-center gap-2" key={index}>
                    <TbCircleDotFilled className="text-xl text-yel mb-3" />
                    <div>
                      <Tooltip title={ingredient?.name} color="#2b3348">
                        <p className="text-lg text-gray-200">
                          {truncateText(ingredient?.name, 15)}
                        </p>
                      </Tooltip>
                      <Tooltip
                        title={`${ingredient?.amount} ${
                          ingredient?.unit || "pieces"
                        }`}
                        color="#2b3348"
                      >
                        <p className="text-base text-gray-400">
                          {truncateText(
                            `${ingredient?.amount} ${
                              ingredient?.unit || "pieces"
                            }`,
                            15
                          )}
                        </p>
                      </Tooltip>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-5/6 mx-auto justify-between mb-10">
        <div className="py-3 px-5 rounded-lg bg-gray-700 w-3/5">
          <h1>Preparation Steps</h1>
          <ul>{}</ul>
        </div>
        <div className="py-3 px-5 rounded-lg bg-gray-700 w-[35%]"></div>
      </div>
    </div>
  );
}
