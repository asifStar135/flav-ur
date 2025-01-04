"use client";

import { Cookbook } from "@/services";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const CookBook = () => {
  const { user } = useUser();

  const [cookbookStats, setCookbookStats] = useState({
    total: 0,
    listNames: 0,
    notes: 0,
  });
  const [recipeList, setRecipeList] = useState([]);

  // console.log("cookbook->", cookbookStats)
  console.log("recipeList->", recipeList)

  const getRecipesOfList = (list)=>{
    console.log("fecth list->", list)
    Cookbook.getRecipesOfListCookbook(list).then((res) => {
      if (res.success) {
        console.log(res);
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
        <div className="bg-gray-800 px-10 py-4 rounded-full mt-10">
          <div className="text-white text-center">
            <h2 className="text-2xl text-gray-300 font-semibold mb-5">
              Your
              <b className="text-yel"> Lists </b>
            </h2>
          </div>

          <div className="flex justify-around font-semibold text-2xl">
            {
              cookbookStats?.listNames?.length && 
              cookbookStats?.listNames?.map((list, index)=>(
              <button key={index} onClick={()=>getRecipesOfList(list)} className="w-[10rem] p-2 rounded-full hover:rotate-6 shadow shadow-yel text-dark bg-yel transition-all">
                {list}
              </button>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default CookBook;
