"use client";

import { getRating, getTime, truncateText } from "@/helper";
import { Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { BiFoodTag } from "react-icons/bi";
import { FaClock, FaStar } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { TbBowlSpoonFilled } from "react-icons/tb";
import { FaClockRotateLeft } from "react-icons/fa6";
import moment from "moment";
import Link from "next/link";
import { PiNotepad } from "react-icons/pi";

const RecipeCard = ({ recipeItem, isRecent, cardWidth }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [isWide, setIsWide] = useState(true);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 800) setIsWide(false);
  }, []);
  return (
    <div
      className={
        cardWidth + " bg-gray-800 rounded-lg pb-2 self-center relative"
      }
    >
      {recipeItem?.notes && (
        <div className="absolute -top-4 -right-4 bg-gray-700 rounded-full p-1 border border-yel hover:scale-110 transition-all cursor-pointer">
          <PiNotepad
            className="text-yel text-3xl"
            onClick={() => setShowModal(true)}
          />
        </div>
      )}
      <img
        src={recipeItem?.image || "/assets/default-recipe.png"}
        alt={recipeItem?.title}
        className={"rounded-t-lg " + cardWidth}
      />
      <div className="px-2 xl:px-3 py-2">
        <Tooltip
          title={recipeItem?.title?.length > 25 ? recipeItem.title : ""}
          color="#2b3348"
          className="cursor-pointer xl:text-lg text-gray-300"
          styles={{ root: { maxWidth: "200px" } }}
          // overlayStyle={{ maxWidth: "200px" }} // Optional: Set max width for the tooltip
          placement="top" // Optional: Adjust placement
        >
          {truncateText(recipeItem?.title, isWide ? 25 : 18)}
        </Tooltip>
        <div className="flex justify-between items-center text-lg my-1 xl:my-2 text-gray-400">
          <div className="flex items-center gap-2">
            <FaClock className="text-blue-600" />
            <span>{getTime(recipeItem?.readyInMinutes)}</span>
          </div>
          <div className="flex items-center gap-2">
            <TbBowlSpoonFilled className="text-green-600" />
            <span>
              {recipeItem?.servings} {isWide ? "servings" : null}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-lg my-1 xl:my-2 text-gray-400">
          <div className="flex items-center gap-2 text-gray-400">
            <MdHealthAndSafety className="text-green-400" />
            <span>
              {isWide ? "Health Score:" : null} {recipeItem?.healthScore}
            </span>
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
        <Link
          href={"/recipe/" + recipeItem?.id}
          className="mt-2 xl:mt-4 xl:w-3/4 bg-yellow-500 text-center hover:bg-yellow-600 text-dark font-bold py-1 xl:py-2 px-4 rounded-lg transition-colors"
        >
          View Recipe
        </Link>

        {isRecent && (
          <div className="flex items-center gap-1 text-gray-400 justify-center mt-2">
            <FaClockRotateLeft />
            {moment(recipeItem?.updatedAt)?.fromNow()}
          </div>
        )}
      </div>

      <Modal
        className="my-modal"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <h1 className="text-xl text-gray-100 text-center font-semibold my-3">
          Your Custom Recipe <b className="text-yel">Notes</b>
        </h1>
        <p className="text-gray-300 text-lg p-3 border-t border-b border-gray-500 rounded-xl">
          {recipeItem?.notes}
        </p>
      </Modal>
    </div>
  );
};

export default RecipeCard;
