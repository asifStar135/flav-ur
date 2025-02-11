"use client";

import { getRandomAvatars } from "@/helper";
import { Options } from "@/helper";
import { useUser } from "@clerk/nextjs";
import { Select, Switch } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string>("./assets/default.jpg");
  const [editAvatar, setEditAvatar] = useState(false);
  const [bio, setBio] = useState("");
  const [preference, setPreference] = useState({
    cuisine: "",
    diet: "",
    allergies: "",
    glutenFree: false,
    dairyFree: false,
  });

  const selectAvatar = (avt: string) => {
    setAvatar(avt);
    setEditAvatar(false);
  };

  const handleSubmit = () => {
    user?.update({
      unsafeMetadata: {
        preference,
        bio,
        avatar,
      },
    });
    console.log("This is updated User ==>>", user?.unsafeMetadata);
    router.push("/");
  };

  const { user, isLoaded } = useUser();

  return (
    <div className="xl:my-16 w-11/12 xl:w-4/5 mx-auto bg-gray-900 p-4 xl:p-10">
      <h1 className="text-xl xl:text-3xl font-semibold mb-6 text-center">
        Complete Your Profile to Get Started
      </h1>

      {editAvatar ? (
        <div className="w-11/12 lg:w-3/4 mx-auto">
          <h1 className="font-semibold text-2xl my-4">Choose yourself 🤠</h1>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8 my-8">
            {getRandomAvatars().map((avt) => (
              <img
                src={avt}
                className="lg:w-32 lg:h-32 border border-yel p-1 rounded-full object-cover hover:scale-110 transition-all cursor-pointer"
                alt="Select this avatar"
                onClick={() => selectAvatar(avt)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row justify-around items-center">
          <div className="w-11/12 xl:w-2/5">
            {/* Avatar Upload */}
            <div className="flex flex-col lg:flex-row items-center mb-6 gap-3 lg:gap-8 justify-center">
              <div className="flex items-center justify-center overflow-hidden mb-4">
                <img
                  src={avatar}
                  alt="Avatar Preview"
                  className="w-44 h-44 rounded-full object-cover p-1 border border-yel"
                />
              </div>
              <button
                onClick={() => setEditAvatar(true)}
                className="cursor-pointer bg-yel hover:bg-yel2 transition-all text-white px-4 py-2 rounded-lg mx-auto"
              >
                Change Avatar
              </button>
            </div>

            {/* Bio Section */}
            <div className="w-full max-w-md mb-6">
              <label className="block text-lg font-medium mb-2">
                Add a Bio
              </label>
              <textarea
                className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yel"
                placeholder="Tell us about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>
          <div className="text-lg">
            <div className="flex gap-3 xl:gap-8 px-3 my-5 text-gray-400">
              <div>
                <p className="mb-2">Choose your cuisine</p>
                <Select
                  title="choose your favorite cuisine"
                  allowClear
                  placeholder="Select cuisine..."
                  // className="w-full"
                  options={Options.cuisines}
                  showSearch
                  value={preference?.cuisine || undefined}
                  onChange={(value: string) =>
                    setPreference((state) => ({ ...state, cuisine: value }))
                  }
                />
              </div>
              <div>
                <p className="mb-2">Choose your diet</p>
                <Select
                  // className="w-full"
                  allowClear
                  title="choose your diet type"
                  placeholder="Select diet type..."
                  options={Options.dietTypes}
                  showSearch
                  value={preference?.diet || undefined}
                  onChange={(value: string) =>
                    setPreference((state) => ({ ...state, diet: value }))
                  }
                />
              </div>
            </div>
            <div className="flex justify-between my-5 text-gray-400">
              <div className="flex gap-3 items-center mx-4 xl:mx-8">
                <p>Dairy free</p>
                <Switch
                  checked={preference?.dairyFree}
                  onChange={(checked) =>
                    setPreference((state) => ({
                      ...state,
                      dairyFree: checked,
                    }))
                  }
                />
              </div>
              <div className="flex gap-3 items-center mx-4 xl:mx-8">
                <p>Gluten free</p>
                <Switch
                  checked={preference?.glutenFree}
                  onChange={(checked) =>
                    setPreference((state) => ({
                      ...state,
                      glutenFree: checked,
                    }))
                  }
                />
              </div>
            </div>
            <div className="text-gray-400 max-w-[85%] mx-auto">
              <p>Allergies (optional)</p>
              <input
                type="text"
                placeholder="E.g., peanuts, shellfish"
                className="w-full p-2 bg-gray-700 rounded-lg text-white my-2"
                value={preference?.allergies}
                onChange={(e) =>
                  setPreference((state) => ({
                    ...state,
                    allergies: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center mt-8 xl:mt-0">
        {editAvatar == false && (
          <button
            onClick={handleSubmit}
            className=" bg-yel hover:bg-yel2 transition-all text-white px-6 py-3 rounded-lg font-semibold"
          >
            Save Preferences
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
