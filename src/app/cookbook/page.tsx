"use client";

import Loader from "@/components/Loader";
import RecipeCard from "@/components/RecipeCard";
import { Cookbook } from "@/services";
import { useUser } from "@clerk/nextjs";
import { Avatar, Badge } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";

const CookBook = () => {
  const { user } = useUser();

  const [cookbookStats, setCookbookStats] = useState({
    total: 0,
    listNames: [],
    notes: 0,
  });
  const pageNo = useRef(0);
  const [recipeList, setRecipeList] = useState<any[]>([]);
  const activeList = useRef("all");
  const [isLoading, setIsLoading] = useState(false);
  const divRef = useRef(null);

  const getCookbookItems = async () => {
    try {
      pageNo.current++;
      setIsLoading(true);
      const response = await Cookbook.getRecipesOfListCookbook(
        activeList.current,
        pageNo.current - 1
      );
      console.log("Result => ", response);
      setRecipeList((prev) => prev.concat(response));
      if (response?.length < 5) pageNo.current = -1;
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const init = async () => {
    try {
      setIsLoading(true);
      const response = await Cookbook.getCookbookStats();
      setCookbookStats(response);

      getCookbookItems();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNewList = (list: string) => {
    activeList.current = list;
    setRecipeList([]);
    pageNo.current = 0;
    getCookbookItems();
  };

  useEffect(() => {
    if (pageNo.current < 1 || isLoading || recipeList.length == 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getCookbookItems();
        }
      },
      { threshold: 1 }
    );

    if (divRef.current) observer.observe(divRef.current);
    return () => {
      if (divRef.current) observer.unobserve(divRef.current);
    };
  }, [divRef.current, isLoading]);

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div className="text-white p-6 rounded-lg shadow-md mb-4 w-3/4 mx-auto">
        {/* Welcome Section */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-3xl font-semibold">
              Welcome back{" "}
              <b className="text-yel">{user?.fullName || "User"}, </b>
              to Your <b className="text-gray-400">Cookbook! </b>
            </p>
            <p className="text-2xl text-gray-300 my-3">
              Manage your perfect collection of{" "}
              <b className="text-yel">Unique & Tasty</b> Recipes. . .
            </p>
            {/* Stats */}
            <div className="bg-gray-800 px-10 py-2 rounded-full mt-10">
              <div className="text-white text-center">
                <h2 className="text-2xl text-gray-300 font-semibold mb-5">
                  Quick
                  <b className="text-yel"> Stats </b>
                </h2>
              </div>
              <div className="flex justify-around font-semibold text-2xl">
                <div className="text-center">
                  <div className="w-18 h-18 p-2 rounded-full shadow shadow-yel text-dark bg-yel transition-all">
                    {cookbookStats?.total}
                  </div>
                  <p className="text-lg text-gray-300 mt-3">Total Recipes</p>
                </div>
                <div className="text-center">
                  <div className="w-18 h-18 p-2 rounded-full shadow shadow-yel text-dark bg-yel transition-all">
                    {cookbookStats?.listNames?.length ?? "0"}
                  </div>
                  <p className="text-lg text-gray-300 mt-3">Lists Created</p>
                </div>
                <div className="text-center">
                  <div className="w-18 h-18 p-2 rounded-full shadow shadow-yel text-dark bg-yel transition-all">
                    {cookbookStats?.notes}
                  </div>
                  <p className="text-lg text-gray-300 mt-3">Custom Notes</p>
                </div>
              </div>
            </div>
          </div>
          <img
            src="/assets/cookbook.png"
            alt="Cookbook of a Chef"
            className="w-52"
          />
        </div>
      </div>

      {/* cookbook lists and recipes */}
      <div className="w-[85%] rounded-xl mx-auto p-6 mb-10 shadow-inner border-2 border-gray-800 shadow-gray-800">
        <div className="">
          <h2 className="text-3xl text-center text-gray-200 font-semibold mb-5">
            Your
            <b className="text-yel"> Saved </b> Items
          </h2>

          <div className="flex flex-wrap justify-center gap-6 text-lg mb-10">
            <Badge
              overflowCount={20}
              count={cookbookStats.total}
              className={`min-w-20 p-1 px-5 rounded-xl text-lg text-center shadow shadow-yel border-yel hover:border text-dark transition-all ${
                activeList.current == "all" ? "bg-yel border" : "text-gray-300"
              }`}
            >
              <button
                onClick={() => {
                  fetchNewList("all");
                }}
              >
                All
              </button>
            </Badge>

            {cookbookStats?.listNames?.length
              ? cookbookStats?.listNames?.map((list: any, index: number) => (
                  <Badge
                    overflowCount={9}
                    count={list.count}
                    className={`min-w-20 p-1 px-5 rounded-xl text-lg shadow shadow-yel border-yel hover:border text-dark transition-all ${
                      activeList.current == list.listName
                        ? "bg-yel border"
                        : "text-gray-300"
                    }`}
                  >
                    <button
                      key={index}
                      onClick={() => {
                        fetchNewList(list?.listName);
                      }}
                    >
                      {list?.listName}
                    </button>
                  </Badge>
                ))
              : null}
          </div>

          <div>
            <div className="flex gap-12 flex-wrap justify-center">
              {recipeList?.map((recipe: any, index: number) => (
                <RecipeCard
                  key={index}
                  recipeItem={recipe}
                  cardWidth="w-[275px]"
                />
              ))}
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
      </div>
    </div>
  );
};

export default CookBook;
