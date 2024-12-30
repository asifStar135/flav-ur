"use client";

import { collapseSummary, getRating, getTime, truncateText } from "@/helper";
import { Cookbook, Recent, Recipe } from "@/services";
import { Divider, Input, Modal, Rate, Select, Space, Tag, Tooltip } from "antd";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  BiFoodTag,
  BiSolidLike,
  BiSolidMessage,
  BiSolidMessageSquareEdit,
} from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { FaClock, FaGrinHearts } from "react-icons/fa";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { LuMilkOff } from "react-icons/lu";
import {
  MdBookmarkAdd,
  MdBookmarkAdded,
  MdHealthAndSafety,
} from "react-icons/md";
import { PiBowlFood } from "react-icons/pi";
import { TbBowlSpoonFilled, TbCircleDotFilled } from "react-icons/tb";
const imageBaseUrl = "https://img.spoonacular.com/recipes/";

type ParamsType = {
  id: string;
};

export default function Page({ params }: { params: Promise<ParamsType> }) {
  const { id: recipeId } = use(params);

  const [recipe, setRecipe] = useState<any>({});
  const [expandSummary, setExpandSummary] = useState(false);
  const [recipeTags, setRecipeTags] = useState<any[]>([]);
  const [similarRecipes, setSimilarRecipes] = useState<any[]>([]);
  const [showCookbookModal, setShowCookbookModal] = useState<string>("");
  const [listName, setListName] = useState("");
  const [newListName, setNewListName] = useState("");
  const [cookBookLists, setCookBookLists] = useState<any[]>([]);
  const [cookbookNotes, setCookbookNotes] = useState<string>("");
  const [recipeCookbookDetails, setRecipeCookbookDetails] = useState<any>({
    notes: "",
    listName: "",
  });
  const isSaved = useRef(false);

  const addNewList = () => {
    if (!newListName) {
      toast.error("Please enter a list name !");
      return;
    }
    setCookBookLists((prev) => [
      ...prev,
      { label: newListName, value: newListName },
    ]);
    setNewListName("");
  };

  const addRecentItem = async () => {
    try {
      const response = await Recent.addRecentRecipe({
        id: recipe.id,
        image: recipe?.image,
        title: recipe?.title,
        servings: recipe?.servings,
        readyInMinutes: recipe?.readyInMinutes,
        spoonacularScore: recipe?.spoonacularScore,
        vegetarian: recipe?.vegetarian,
        healthScore: recipe?.healthScore,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCookbook = async () => {
    if (!listName) {
      toast.error("Please select a list to add the recipe!");
      return;
    }
    if (showCookbookModal == "notes" && !cookbookNotes) {
      toast.error("Please enter some notes!");
      return;
    }
    const result = await Cookbook.addToCookBook(
      {
        id: recipeId,
        image: recipe?.image,
        title: recipe?.title,
        servings: recipe?.servings,
        readyInMinutes: recipe?.readyInMinutes,
        spoonacularScore: recipe?.spoonacularScore,
        healthScore: recipe?.healthScore,
        vegetarian: recipe?.vegetarian,
        notes: recipe?.notes,
      },
      listName,
      cookbookNotes
    );
    if (result?.success) {
      toast.success("Added recipe to cookbook.");
      isSaved.current = true;
      setRecipeCookbookDetails({
        notes: cookbookNotes,
        listName: listName,
      });
    }
    closeCookbookModal();
  };

  const closeCookbookModal = () => {
    setShowCookbookModal("");
    setCookbookNotes("");
    setNewListName("");
    setListName(recipeCookbookDetails?.listName);
    setCookbookNotes(recipeCookbookDetails?.notes);
  };

  const fetchCookbookDetails = async () => {
    const result = await Cookbook?.getCookbookDetails(recipeId);
    if (result?.details) {
      setCookbookNotes(result?.details?.notes);
      setListName(result?.details?.listName);
      setRecipeCookbookDetails({
        notes: result?.details?.notes,
        listName: result?.details?.listName,
      });
      isSaved.current = true;
    }
    setCookBookLists(() =>
      result?.listNames?.map((item: string) => {
        return { label: item, value: item };
      })
    );
  };

  const removeFromCookbook = async () => {
    const response = await Cookbook.updateInCookbook(
      recipeId,
      cookbookNotes,
      ""
    );
    if (response.success) {
      toast.success("Removed recipe from cookbook.");
      isSaved.current = false;
      setListName("");
      setShowCookbookModal("");
    }
  };

  const updateCookbook = async () => {
    const response = await Cookbook.updateInCookbook(
      recipeId,
      cookbookNotes,
      listName
    );
    if (response.success) {
      toast.success("Updated recipe details in cookbook.");
      setRecipeCookbookDetails({
        notes: cookbookNotes,
        listName: listName,
      });
      setShowCookbookModal("");
    }
  };

  useEffect(() => {
    if (recipeId) {
      Recipe?.getRecipeInformation(recipeId).then((recipeInformation) => {
        setRecipe(recipeInformation);
      });
      Recipe?.getSimilarRecipes(recipeId).then((recipes) => {
        setSimilarRecipes(recipes);
      });
      fetchCookbookDetails();
    }
  }, [recipeId]);

  useEffect(() => {
    if (!recipe?.id) return;
    //  save item in the recently visited
    addRecentItem();

    //  add tags to the recipe
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
        color: "#ff4f48",
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
        color: "#ef61a0",
      });
    setRecipeTags(arr);

    console.log(recipe);
  }, [recipe]);

  return (
    <div>
      <div className="flex w-5/6 mx-auto justify-between my-10">
        <div className="bg-gray-800 self-center rounded-xl shadow shadow-gray-800 w-1/3">
          <img
            src={recipe?.image}
            className="rounded-t-lg self-start"
            alt="Recipe image"
          />
          <div className="p-3 px-5">
            <div className="flex gap-5 justify-center items-center">
              <div className="flex items-center gap-3 font-semibold justify-center text-yel text-2xl">
                <span>{getRating(recipe?.spoonacularScore)} </span>
                <Rate
                  value={getRating(recipe?.spoonacularScore)}
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
                    overlayStyle={{
                      maxWidth: 500,
                    }}
                    overlay={
                      <div className="flex flex-wrap gap-2 justify-around p-3">
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
              <div className="mt-5 flex items-center gap-2">
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
                    overlayStyle={{
                      maxWidth: 500,
                    }}
                    overlay={
                      <div className="flex flex-wrap gap-2 justify-around p-3">
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
        <div className="w-3/5 self-center">
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
          <div className="flex justify-end gap-5 mt-4">
            <button
              className="px-2 py-1 border border-yel text-yel hover:text-gray-800 text-lg rounded-md hover:bg-yel hover:scale-110 transition-all"
              onClick={() => setShowCookbookModal("add")}
            >
              {isSaved.current ? (
                <div className="flex gap-1 items-center">
                  <MdBookmarkAdded className="text-xl" />
                  <p>{recipeCookbookDetails?.listName}</p>
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  <MdBookmarkAdd className="text-xl" />
                  <p>Cookbook</p>
                </div>
              )}
            </button>
            <button
              className="flex gap-1 items-center px-2 py-1 border border-yel text-yel hover:text-gray-800 text-lg rounded-md hover:bg-yel hover:scale-110 transition-all"
              onClick={() => setShowCookbookModal("notes")}
            >
              <BiSolidMessageSquareEdit className="text-xl" />
              <p>Notes</p>
            </button>
          </div>

          <div className="bg-gray-800 px-5 py-3 rounded-lg mt-5">
            <p className="font-semibold text-2xl text-center mb-5">
              <b className="text-yel">Ingredients</b> You Need
            </p>
            <div className="grid grid-cols-4 gap-2">
              {recipe?.extendedIngredients?.map(
                (ingredient: any, index: number) => (
                  <div className="flex items-center gap-2" key={index}>
                    <TbCircleDotFilled className="text-xl text-yel mb-3" />
                    <div>
                      <Tooltip
                        title={
                          ingredient?.name?.length > 15 && ingredient?.name
                        }
                        color="#2b3348"
                      >
                        <p className="text-lg text-gray-200">
                          {truncateText(ingredient?.name, 15)}
                        </p>
                      </Tooltip>
                      <p className="text-base text-gray-400">
                        {truncateText(
                          `${ingredient?.amount} ${
                            ingredient?.unit || "pieces"
                          }`,
                          15
                        )}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-5/6 mx-auto justify-between mb-10">
        <div className="py-3 px-8 rounded-lg bg-gray-800 w-3/5 self-start">
          <h1 className="text-2xl font-semibold text-center mb-5">
            <b className="text-yel">Steps </b> You've to Follow
          </h1>
          <div>
            {recipe?.analyzedInstructions?.map((instruction: any) =>
              instruction?.steps?.map((step: any, index: number) => (
                <div key={index} className="my-2">
                  <span className="font-bold text-gray-200">{index + 1}. </span>
                  <span className="text-gray-300">{step.step}</span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="py-3 px-5 rounded-lg bg-gray-800 w-[38%] self-start">
          <h1 className="text-2xl font-semibold text-center mb-3">
            <b className="text-yel">Nutritional </b> information
          </h1>
          <p className="font-semibold text-center text-gray-300 text-lg mb-2">
            Diets included
          </p>
          <div className="flex gap-2 mb-3">
            {recipe?.diets?.length ? (
              recipe?.diets.slice(0, 3).map((diet: any) => (
                <Tag
                  key={diet}
                  className="border border-gray-300 text-lg m-0 bg-gray-700"
                >
                  {diet}
                </Tag>
              ))
            ) : (
              <p className="text-lg text-gray-400 text-center">
                - No related diets -
              </p>
            )}
            {recipe?.diets?.length > 3 && (
              <Tooltip
                color="#2b3348"
                overlayStyle={{
                  maxWidth: 500,
                }}
                overlay={
                  <div className="flex flex-wrap gap-2 justify-around">
                    {recipe?.diets.slice(3).map((diet: any) => (
                      <Tag
                        key={diet}
                        className="border border-gray-300 text-lg bg-gray-700 m-0"
                      >
                        {diet}
                      </Tag>
                    ))}
                  </div>
                }
              >
                <Tag className="border border-gray-300 text-base self-center bg-gray-700 cursor-pointer">
                  + {recipe?.diets?.length - 3}...
                </Tag>
              </Tooltip>
            )}
          </div>

          <p className="text-center font-semibold">
            Carbs :{" "}
            <b className="text-yel mr-3">
              {recipe?.nutrition?.caloricBreakdown?.percentCarbs}%
            </b>
            Protein :{" "}
            <b className="text-yel mr-3">
              {recipe?.nutrition?.caloricBreakdown?.percentProtein}%
            </b>
            Fat :{" "}
            <b className="text-yel mr-3">
              {recipe?.nutrition?.caloricBreakdown?.percentFat}%
            </b>
          </p>

          <div className="mt-5 border border-gray-500 pt-2 rounded-lg">
            <p className="text-gray-300 text-lg text-center">All values</p>
            <div className="grid grid-cols-2 max-h-44 overflow-auto scrollbar-hidden">
              {recipe?.nutrition?.nutrients?.map((nutr: any, index: number) => (
                <p
                  className={
                    "text-gray-400 border-gray-500 p-1 px-2 " +
                    (index <
                    recipe?.nutrition?.nutrients?.length -
                      (recipe?.nutrition?.nutrients?.length % 2 == 0 ? 2 : 1)
                      ? "border-b"
                      : "")
                  }
                  key={index}
                >
                  {nutr.name} :{" "}
                  <span className="text-gray-300 font-semibold">
                    {nutr.amount} {nutr.unit}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 my-10 mx-auto rounded-lg py-8 border-2 border-gray-800">
        <h3 className="text-2xl text-yel font-semibold mb-4 text-center">
          Check Similar Recipes
        </h3>
        <div className="overflow-x-scroll scrollbar-hidden w-full px-5">
          <div
            className={`flex justify-around gap-5`}
            style={{
              width: similarRecipes?.length * 300 + "px",
            }}
          >
            {similarRecipes.map((item: any, index: number) => (
              <div className="bg-gray-800 rounded-lg" key={index}>
                <img
                  src={imageBaseUrl + item?.id + "-240x150." + item?.imageType}
                  alt=""
                  className="rounded-t-lg w-[280px]"
                />
                <Tooltip
                  title={item?.title?.length > 25 ? item.title : ""}
                  color="#2b3348"
                  className="cursor-pointer text-lg text-gray-300 font-semibold"
                  overlayStyle={{ maxWidth: "300px" }} // Optional: Set max width for the tooltip
                  placement="top" // Optional: Adjust placement
                >
                  <p className="m-3 ">{truncateText(item?.title, 25)}</p>
                </Tooltip>

                <div className="flex justify-between px-5 text-lg">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-blue-600" />
                    <span>{getTime(item?.readyInMinutes)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TbBowlSpoonFilled className="text-green-600" />
                    <span>{item?.servings} servings</span>
                  </div>
                </div>
                <div className="my-5 text-center">
                  <Link
                    href={"/recipe/" + item?.id}
                    className="bg-yellow-500 text-center hover:bg-yellow-600 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={showCookbookModal.length > 0}
        footer={null}
        onCancel={() => closeCookbookModal()}
        className="my-modal"
        width={isSaved.current ? "50%" : "40%"}
      >
        <div className="">
          {isSaved.current == false ? (
            <h1 className="text-xl text-center">
              Add Recipe <span className="text-gray-400">#{recipe?.id}</span> to{" "}
              <b className="text-yel"> CookBook</b>{" "}
              {showCookbookModal == "notes" && (
                <p>
                  with custom <b className="text-yel">Notes</b>
                </p>
              )}
            </h1>
          ) : (
            <h1 className="text-xl text-center">
              Update cookbook details of Recipe{" "}
              <span className="text-gray-400">#{recipe?.id}</span>{" "}
            </h1>
          )}

          <div className="w-2/3 mx-auto my-5">
            <div className={isSaved.current ? "flex gap-3 items-center" : ""}>
              {isSaved.current == false && (
                <h1 className="text-xl mb-2 text-gray-300">
                  Select the list you want to add this recipe
                </h1>
              )}
              {(isSaved.current == false || showCookbookModal == "add") && (
                <Select
                  options={cookBookLists}
                  className="w-80"
                  placeholder="Select the list to add..."
                  value={listName || undefined}
                  onChange={(value) => setListName(value)}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider className="border-gray-400 my-1 mt-3" />
                      <Space className="p-2 flex justify-between items-center">
                        <Input
                          placeholder="New list name..."
                          value={newListName}
                          onChange={(e) => setNewListName(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                          className="w-48 text-lg"
                        />
                        <button
                          className="border border-gray-400 bg-gray-700 rounded-lg px-3 py-1 hover:bg-gray-500"
                          onClick={() => addNewList()}
                        >
                          Add +
                        </button>
                      </Space>
                    </>
                  )}
                />
              )}
              {isSaved.current && showCookbookModal == "add" && (
                <button
                  className="rounded-lg p-1 px-6 text-lg font-semibold border border-gray-600 hover:bg-gray-600 transition-all"
                  onClick={() => removeFromCookbook()}
                >
                  Remove
                </button>
              )}
            </div>

            {showCookbookModal == "notes" && (
              <div>
                <h1 className="text-xl my-2 text-gray-300">
                  Add your custom notes to this recipe
                </h1>
                <Input.TextArea
                  value={cookbookNotes}
                  onChange={(e) => {
                    setCookbookNotes(e.target.value);
                  }}
                  placeholder="Enter your notes..."
                  className="text-lg"
                  rows={3}
                />
              </div>
            )}
          </div>
          <div className="flex gap-5 my-5 justify-center font-semibold text-lg">
            <button
              className="border border-yel hover:bg-yel hover:text-dark transition-all rounded-lg p-1 px-6"
              onClick={() =>
                isSaved.current ? updateCookbook() : addToCookbook()
              }
            >
              Save Item
            </button>
            <button
              className="rounded-lg p-1 px-6 border border-gray-600 hover:bg-gray-600 transition-all"
              onClick={() => closeCookbookModal()}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
