"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { store } from "@/store";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ConfigProvider, Modal, Popover, Select, Switch } from "antd";
import { CiAt } from "react-icons/ci";
import { Options } from "@/helper/recipe";
import { IoCheckmarkCircle, IoCloseCircle, IoMail } from "react-icons/io5";
import { FaAt } from "react-icons/fa6";
import { Recipe } from "@/helper";
import RecipeCard from "@/components/RecipeCard";

const Profile = () => {
  // logout function
  const { username, email, avatar, clearState, setUser } = store();
  console.log("User details from state", username, email);

  const [recentRecipes, setRecentRecipes] = useState<any>([]);

  const [showLogOutModal, setShowLogOutModal] = useState(false);

  const logout = async () => {
    try {
      const response = await axios.get(`/api/user/logout`);

      if (response.data.success) {
        alert("User logged out successfully");
        clearState(); // clear user state
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const content = (
    <div className="text-gray-200 text-lg flex flex-col gap-3">
      <p className="hover:text-gray-800 transition cursor-pointer">
        Edit details
      </p>
      <p
        className="hover:text-gray-800 transition cursor-pointer"
        onClick={() => setShowLogOutModal(true)}
      >
        Log Out
      </p>
      <p className="hover:text-gray-800 transition cursor-pointer">
        Remove Account
      </p>
    </div>
  );

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      const response = await Recipe.getRecentRecipes();
      setRecentRecipes(response.results);
    };

    fetchRandomRecipes();
  });

  return username ? (
    <div>
      <div className="w-4/5 my-10 mx-auto bg-gray-800 rounded-lg px-20 py-10 flex justify-around">
        <div className="p-8 w-1/3 border border-yellow-700 rounded-2xl text-center relative">
          <Popover
            content={content}
            trigger="click"
            placement="bottomRight"
            className="absolute top-3 right-3 text-left"
            color="#5a6069"
          >
            <button className="text-xl p-2 text-yel hover:bg-gray-500 transition-all cursor-pointer rounded-full">
              <BsThreeDotsVertical />
            </button>
          </Popover>
          <div>
            <img
              src={avatar}
              alt="User avatar"
              className="h-40 w-48 object-cover rounded-full mx-auto"
            />
          </div>
          <div>
            <p className="text-3xl font-semibold text-gray-200 mt-3">
              Md Asif Mondal
            </p>

            <p className="text-sm w-auto text-gray-500 mb-4">
              I'm a passionate food blogger and a loving traveler. I love
              sharing my recipes and experiences with others.
            </p>

            <div className="flex items-center text-2xl text-gray-400 gap-4">
              <FaAt />
              <span>{username}</span>
            </div>
            <div className="flex items-center text-2xl text-gray-400 gap-4">
              <IoMail />
              <span>{email}</span>
            </div>
          </div>
        </div>

        <div className="text-lg">
          <p className="text-3xl text-gray-200 text-center mb-8">
            Your Preferences
          </p>
          <div className="flex gap-8 my-5 text-gray-400">
            <div>
              <p className="mb-2">Choose your fav cuisince</p>
              <Select
                title="choose your favorite cuisince"
                allowClear
                placeholder="Select cuisine..."
                className="w-full"
                options={Options.cuisinces}
                showSearch
              />
            </div>
            <div>
              <p className="mb-2">Choose your preferred diet</p>
              <Select
                className="w-full"
                allowClear
                title="choose your diet type"
                placeholder="Select diet type..."
                options={Options.dietTypes}
                showSearch
              />
            </div>
          </div>
          <div className="flex justify-between my-5 text-gray-400">
            <div className="flex gap-3 items-center mx-8">
              <p>Gluten free</p>
              <Switch />
            </div>
            <div className="flex gap-3 items-center mx-8">
              <p>Dairy free</p>
              <Switch />
            </div>
          </div>
          <div className="text-gray-400">
            <p>Allergies (optional)</p>
            <input
              type="text"
              placeholder="E.g., peanuts, shellfish"
              className="w-full p-2 bg-gray-700 rounded-lg text-white my-2"
            />
          </div>
          <div className="flex justify-around mt-5">
            <button className="rounded-lg p-2 px-5 border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-gray-800 transition-all">
              Reset
            </button>
            <button className="rounded-lg p-2 px-5 border border-yel text-gray-300 hover:bg-yel hover:text-gray-800 transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="w-4/5 my-10 mx-auto bg-gray-800 rounded-lg px-20 py-10 flex justify-around">
        <h3 className="text-xl text-white font-semibold mb-4">Recent Items</h3>
        <div className="overflow-auto whitespace-nowrap scrollbar-hidden">
          <div className="flex gap-10 w-[100vw]">
            {recentRecipes.map((recipe: any) => (
              <RecipeCard recipeItem={recipe} key={recipe?.id} />
            ))}
          </div>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      <Modal
        open={showLogOutModal}
        onCancel={() => setShowLogOutModal(false)}
        footer={null}
        className="my-modal"
        zIndex={1050}
        closable={false}
        centered
      >
        <div className="text-xl text-gray-300 text-center">
          <p>
            Do you want to log out from <b className="text-yel"> Flav-Ur ? </b>
          </p>
          <div className="flex gap-5 my-5 justify-center">
            <button
              className="rounded-lg p-1 px-6 border border-gray-600 hover:bg-gray-600 transition-all"
              onClick={logout}
            >
              Yes
            </button>
            <button
              className="rounded-lg p-1 px-6 border border-gray-600 hover:bg-gray-600 transition-all"
              onClick={() => setShowLogOutModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    <div className="text-4xl text-center">LOADING . . . .</div>
  );
};

export default Profile;
