"use client";

import RecipeCard from "@/components/RecipeCard";
import { Cookbook } from "@/services";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";

const CookBook = () => {
  const { user } = useUser();

  const [cookbookStats, setCookbookStats] = useState({
    total: 0,
    listNames: 0,
    notes: 0,
  });
  const [recipeList, setRecipeList] = useState([]);
  const [activeList, setActiveList] = useState(null);

  const getRecipesOfList = (list)=>{
    Cookbook.getRecipesOfListCookbook(list).then((res) => {
      if (res.success) {
        setRecipeList(res.result);
      }
    });
  }

  const init = () => {
    Cookbook.getCookbookStats().then((res) => {
      if (res.success) {
        setCookbookStats(res.result);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div className="text-white p-6 rounded-lg shadow-md mb-6 w-3/4 mx-auto">
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
                  <div className="w-18 h-18 p-2 rounded-full hover:rotate-6 shadow shadow-yel text-dark bg-yel transition-all">
                    {cookbookStats?.total}
                  </div>
                  <p className="text-lg text-gray-300 mt-3">Total Recipes</p>
                </div>
                <div className="text-center">
                  <div className="w-18 h-18 p-2 rounded-full hover:rotate-6 shadow shadow-yel text-dark bg-yel transition-all">
                    {cookbookStats?.listNames?.length ?? "0"}
                  </div>
                  <p className="text-lg text-gray-300 mt-3">Lists Created</p>
                </div>
                <div className="text-center">
                  <div className="w-18 h-18 p-2 rounded-full hover:rotate-6 shadow shadow-yel text-dark bg-yel transition-all">
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

        {/* cookbook lists and recipes */}
        <div className="bg-gray-800 px-10 py-4 rounded-xl mt-10">
          <div className="text-white text-center">
            <h2 className="text-2xl text-gray-300 font-semibold mb-5">
              Your
              <b className="text-yel"> Lists </b>
            </h2>
          </div>

          <div className="flex justify-around font-semibold text-2xl">
            <button onClick={()=>{getRecipesOfList("all"); setActiveList("all")}} className={`w-40 p-2 rounded-full bg-yellow-100 hover:bg-yel shadow shadow-yel text-dark transition-all ${activeList == "all" && 'active:bg-yel'}`}>
                  All
            </button>

            {
              cookbookStats?.listNames?.length && 
              cookbookStats?.listNames?.map((list, index)=>(
              <button key={index} onClick={()=>{getRecipesOfList(list); setActiveList(list)}} className={`w-40 p-2 rounded-full bg-yellow-100 hover:bg-yel shadow shadow-yel text-dark transition-all ${activeList == list && 'active:bg-yel'}`}>
                {list}
              </button>
              ))
            }
          </div>
        </div>
      </div>

      {
        activeList != null && 
        <div className="w-4/5 my-10 mx-auto py-8">
          <h3 className="text-2xl text-yel font-semibold mb-6 text-center">
            Recipes from 
            <b className="text-yel"> {activeList} </b>
          </h3>
          <div className="w-full flex gap-5">
            <div
              className={`flex flex-wrap gap-8 px-4 w-[${
                recipeList.length * 21 + 10
              }vw]`}
            >
              {recipeList?.length ? (
                recipeList.map((recipe, index) => (
                  <RecipeCard
                    recipeItem={recipe}
                    key={recipe?.id}
                    isRecent={true}
                    cardWidth="w-[19vw]"
                  />
                ))
              ) : (
                <div>No recent items found</div>
              )}
              {/* {recentPageNo.current != -1 && ( */}
                <div
                  className="text-2xl cursor-pointer flex items-center justify-center text-yel border border-yel hover:bg-yel hover:text-dark rounded-xl self-center w-40 p-3"
                  // onClick={() => fetchrecipeList()}
                >
                  <p>More</p>
                  <CiSquarePlus className="text-4xl" />
                </div>
              {/* )} */}
            </div>
          </div>
        </div>
      }


    
    </div>
  );
};

export default CookBook;
