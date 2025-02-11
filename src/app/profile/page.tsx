"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Input, Modal, Popover, Select, Switch } from "antd";
import { Options } from "@/helper";
import { IoMail } from "react-icons/io5";
import { FaAt } from "react-icons/fa6";
import { getRandomAvatars } from "@/helper";
import { Recent } from "@/services";
import RecipeCard from "@/components/RecipeCard";
import { SignOutButton, useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import TextArea from "antd/es/input/TextArea";
import { CiSquarePlus } from "react-icons/ci";
import Loader from "@/components/Loader";

const Profile = () => {
  //  LOAD Profile DETAILS
  const { user, isLoaded } = useUser();
  // PREFERENCES FOR EDITING Profile
  const [preference, setPreference] = useState<any>(null);
  // Modals for account actions
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  //   Recent Recipes
  const [recentRecipes, setRecentRecipes] = useState<any>([]);
  const recentPageNo = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const divRef = useRef(null);

  const fetchRecentRecipes = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      recentPageNo.current++;
      const recentItems = await Recent.fetchRecentRecipe(
        recentPageNo.current - 1
      );
      setRecentRecipes((state: Array<any>) => state?.concat(recentItems));
      if (recentItems.length < 10) {
        recentPageNo.current = -1;
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchRecentRecipes();
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

  const setAvatar = (avt: string) => {
    setUserDetails((state: any) => ({
      ...state,
      avatar: avt,
    }));
    setEditAvatar(false);
  };

  const savePreferences = async () => {
    try {
      user?.update({
        unsafeMetadata: {
          preference,
          bio: user?.unsafeMetadata?.bio,
          avatar: user?.unsafeMetadata?.avatar,
        },
      });
      toast.success("Preferences saved successfully.");
    } catch (error) {
      console.log(error);
      toast.error("failed to save preferences.");
    }
  };

  const saveDetails = async () => {
    try {
      // make 1 second of pause using await
      await new Promise((resolve) => setTimeout(resolve, 1000));

      user?.update({
        firstName: userDetails?.firstName,
        lastName: userDetails?.lastName,
        username: userDetails.username,
        unsafeMetadata: {
          preference,
          bio: userDetails.bio,
          avatar: userDetails.avatar,
        },
      });

      toast.success("Details saved successfully.");
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save details.");
    }
  };

  const removeUser = async () => {
    // make 1 second of pause using await
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await user?.delete();
    toast.success("Account removed successfully.");
    window.location.reload();
  };

  const content = (
    <div className="text-gray-200 text-lg flex flex-col gap-3">
      <p
        className="hover:text-gray-800 transition cursor-pointer"
        onClick={() => setShowEditModal(true)}
      >
        Edit details
      </p>
      <p
        className="hover:text-gray-800 transition cursor-pointer"
        onClick={() => setShowLogOutModal(true)}
      >
        Log Out
      </p>
      <p
        className="hover:text-gray-800 transition cursor-pointer"
        onClick={() => setShowRemoveModal(true)}
      >
        Remove Account
      </p>
    </div>
  );

  useEffect(() => {
    if (user?.unsafeMetadata?.preference) {
      setPreference(user?.unsafeMetadata?.preference);
    }
    if (isLoaded && user) {
      setUserDetails({
        name: user.fullName,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        bio: user?.unsafeMetadata?.bio,
        avatar: user?.unsafeMetadata?.avatar,
      });
    }
  }, [isLoaded, user]);

  return isLoaded ? (
    <div>
      <div className="w-11/12 xl:w-4/5 mb-10 xl:mt-10 mx-auto bg-gray-800 rounded-lg px-4 xl:px-20 py-10 xl:flex justify-around">
        <div className="p-5 xl:p-8 w-5/6 mx-auto xl:w-1/3 border border-yellow-700 rounded-2xl text-center relative">
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
              src={
                (user?.unsafeMetadata?.avatar as string) ||
                "/assets/default.jpg"
              }
              alt="User avatar"
              className="h-44 w-44 border border-yel p-1 object-cover rounded-full mx-auto"
            />
          </div>
          <div>
            <p className="text-3xl font-semibold text-gray-200 mt-3">
              {user?.fullName}
            </p>

            <p className="text-base w-auto text-gray-500 mb-4">
              {(user?.unsafeMetadata?.bio as string) || "- No bio -"}
            </p>

            <div className="flex items-center text-xl text-gray-400 gap-4">
              <FaAt />
              <span>{user?.username}</span>
            </div>
            <div className="flex items-center text-xl text-gray-400 gap-4">
              <IoMail />
              <span>{user?.emailAddresses[0]?.emailAddress}</span>
            </div>
          </div>
        </div>

        <div className="text-lg mt-8 xl:m-0">
          <p className="text-3xl text-gray-200 text-center mb-8">
            Your Preferences
          </p>
          <div className="flex gap-8 my-5 text-gray-400">
            <div>
              <p className="mb-2">Choose your cuisine</p>
              <Select
                title="choose your favorite cuisine"
                allowClear
                placeholder="Select cuisine..."
                className="w-full"
                options={Options.cuisines}
                showSearch
                value={preference?.cuisine}
                onChange={(value: string) =>
                  setPreference((state: any) => ({ ...state, cuisine: value }))
                }
              />
            </div>
            <div>
              <p className="mb-2">Choose your diet</p>
              <Select
                className="w-full"
                allowClear
                title="choose your diet type"
                placeholder="Select diet type..."
                options={Options.dietTypes}
                showSearch
                value={preference?.diet}
                onChange={(value: string) =>
                  setPreference((state: any) => ({ ...state, diet: value }))
                }
              />
            </div>
          </div>
          <div className="flex justify-between my-5 text-gray-400">
            <div className="flex gap-3 items-center mx-3 xl:mx-8">
              <p>Dairy free</p>
              <Switch
                checked={preference?.dairyFree}
                onChange={(checked: boolean) =>
                  setPreference((state: any) => ({
                    ...state,
                    dairyFree: checked,
                  }))
                }
              />
            </div>
            <div className="flex gap-3 items-center mx-3 xl:mx-8">
              <p>Gluten free</p>
              <Switch
                checked={preference?.glutenFree}
                onChange={(checked: boolean) =>
                  setPreference((state: any) => ({
                    ...state,
                    glutenFree: checked,
                  }))
                }
              />
            </div>
          </div>
          <div className="text-gray-400">
            <p>Allergies (optional)</p>
            <input
              type="text"
              placeholder="E.g., peanuts, shellfish"
              className="w-full p-2 bg-gray-700 rounded-lg text-white my-2 ring-yel"
              value={preference?.allergies}
              onChange={(e: any) =>
                setPreference((state: any) => ({
                  ...state,
                  allergies: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex justify-around mt-5">
            <button
              onClick={() => savePreferences()}
              className="rounded-lg p-2 px-5 border border-yel text-gray-300 hover:bg-yel hover:text-gray-800 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="w-11/12 xl:w-[85%] rounded-xl mx-auto p-6 mb-10 shadow-inner border-2 border-gray-800 shadow-gray-800">
        <h3 className="text-2xl text-yel font-semibold mb-4 text-center">
          <b className="text-yel">Recently</b> Viewed Items
        </h3>
        <div>
          <div className="flex gap-5 flex-wrap justify-center">
            {recentRecipes?.map((recipe: any, index: number) => (
              <RecipeCard
                key={index}
                recipeItem={recipe}
                cardWidth="w-[160px] xl:w-[270px]"
              />
            ))}
          </div>
          {recentPageNo.current == -1 ? (
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

      {/* EDIT DETAILS MODAL */}
      <Modal
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
        className="my-modal my-10"
        zIndex={1050}
        closable={false}
        centered
      >
        <div className="text-gray-300 text-center">
          <p className="text-2xl text-center font-semibold text-gray-300 mb-3">
            Edit Personal Details
          </p>
          {editAvatar ? (
            <div>
              <h1 className="font-semibold text-2xl my-3 text-yel">
                Choose yourself 🤠
              </h1>
              <div className="grid grid-cols-3 my-8 place-items-center gap-4">
                {getRandomAvatars().map((avt) => (
                  <img
                    src={avt}
                    className="w-28 h-28 border border-yel p-1 rounded-full object-cover hover:scale-110 transition-all cursor-pointer"
                    alt="Select this avatar"
                    onClick={() => setAvatar(avt)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="px-4 xl:px-10">
              <div className="flex justify-center items-center gap-5 my-5">
                <img
                  src={(userDetails?.avatar as string) || "/assets/default.jpg"}
                  alt=""
                  className="rounded-full p-1 border border-yel w-24 h-24"
                />
                <button
                  onClick={() => setEditAvatar(true)}
                  className="cursor-pointer bg-yel hover:bg-yel2 transition-all text-white px-4 py-2 rounded-lg"
                >
                  Change Avatar
                </button>
              </div>
              <div className="flex justify-between gap-4">
                <div className="mb-3 text-xl">
                  <label className="text-left">
                    <p>First name</p>
                  </label>
                  <Input
                    placeholder="Enter your first name..."
                    value={userDetails?.firstName}
                    onChange={(e) =>
                      setUserDetails((state: any) => ({
                        ...state,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-3 text-xl">
                  <label className="text-left">
                    <p>Last name</p>
                  </label>
                  <Input
                    placeholder="Enter your last name..."
                    value={userDetails?.lastName}
                    onChange={(e) =>
                      setUserDetails((state: any) => ({
                        ...state,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="my-3 text-xl">
                <label className="text-left">
                  <p>Username</p>
                </label>
                <Input
                  placeholder="Enter your username..."
                  value={userDetails?.username}
                  onChange={(e) =>
                    setUserDetails((state: any) => ({
                      ...state,
                      username: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="my-3 text-xl">
                <label className="text-left">
                  <p>Enter you Bio</p>
                </label>
                <TextArea
                  className="w-full p-3 text-white rounded-lg"
                  placeholder="Tell us about yourself..."
                  value={userDetails?.bio}
                  onChange={(e) =>
                    setUserDetails((state: any) => ({
                      ...state,
                      bio: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}
          <div className="flex gap-5 my-5 text-xl justify-center">
            <button
              className="border border-yel hover:bg-yel hover:text-dark transition-all rounded-lg p-1 px-6"
              onClick={() => saveDetails()}
            >
              Save Changes
            </button>
            <button
              className="rounded-lg p-1 px-6 border border-gray-600 hover:bg-gray-600 transition-all"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* REMOVE ACCOUNT MODAL */}
      <Modal
        open={showRemoveModal}
        onCancel={() => setShowRemoveModal(false)}
        footer={null}
        className="my-modal"
        zIndex={1050}
        closable={false}
        centered
      >
        <div className="text-xl text-gray-300 text-center">
          <p>
            Do you want to discontinue from{" "}
            <b className="text-yel"> Flav-Ur ? </b>
          </p>
          <div className="flex gap-5 my-5 justify-center">
            <button
              className="border border-red-500 hover:bg-red-500 transition-all rounded-lg p-1 px-6"
              onClick={() => removeUser()}
            >
              Confirm
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
            <div className="border border-yel hover:bg-yel hover:text-dark transition-all rounded-lg p-1 px-6">
              <SignOutButton redirectUrl="/login" />
            </div>
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
