"use client";
import { Recipe } from "@/helper";
import { Options } from "@/helper/recipe";
import { Input, Modal, Radio, Select, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { BsFillFilterCircleFill } from "react-icons/bs";
import { GiFastBackwardButton, GiFastForwardButton } from "react-icons/gi";
import { GrSearchAdvanced } from "react-icons/gr";
import { IoSearchCircleOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";

const Discover = () => {
  const [isFilter, setIsFilter] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterResult, setFilterResult] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [options, setOptions] = useState({
    cuisines: Options.cuisines,
    excludeCuisines: Options.cuisines,
    mealTypes: Options.mealTypes,
    diets: Options.dietTypes,
  });

  const [filter, setFilter] = useState({
    //  taste Matters
    mealType: "",
    cuisine: "",
    excludeCuisine: "",
    // Diet Matters
    diet: "",
    minCalories: 10,
    maxCalories: 1000,
    minProtein: 0,
    maxProtein: 90,
    //  Requirements
    equipments: "",
    ingredients: "",
    excludeIngredients: "",
    maxReadyTime: 30,
    // Other filters
    intolerances: "",
    minServings: 0,
    maxServings: 10,
    sort: "",
    sortDirection: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const submitFilters = async (isNew: boolean) => {
    setShowFilterModal(false);
    console.log(filter);
    const result = await Recipe?.getFilteredRecipes(0, filter, searchQuery);
    if (isNew) {
      setFilterResult(result);
    } else {
      setFilterResult((prev) => prev?.concat(result));
    }
  };

  useEffect(() => {
    if (!isFilter) return;
    const timerHandler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timerHandler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (filter?.cuisine) {
      setOptions((prev) => ({
        ...prev,
        excludeCuisines: Options?.cuisines?.filter(
          (c) => c.value != filter.cuisine
        ),
      }));
    }
    if (filter?.excludeCuisine) {
      setOptions((prev) => ({
        ...prev,
        cuisines: Options?.cuisines?.filter(
          (c) => c.value != filter.excludeCuisine
        ),
      }));
    }
  }, [filter?.cuisine, filter?.excludeCuisine]);

  return (
    <div>
      <h1 className="text-3xl text-center mb-8">
        Find the <b className="text-yel"> Flav'Ur </b> that fits you
      </h1>

      <div className="flex w-1/3 justify-between text-xl border border-yel mx-auto rounded-xl cursor-pointer">
        <div
          className={
            (isFilter ? "bg-yel text-dark" : "") + " rounded-l-lg p-2 w-1/2 p"
          }
          onClick={() => setIsFilter(true)}
        >
          Apply filters with a query
        </div>
        <div
          className={
            (isFilter == false ? "bg-yel text-dark" : "") +
            " rounded-r-lg p-2 w-1/2"
          }
          onClick={() => setIsFilter(false)}
        >
          Search recipes by name
        </div>
      </div>

      <div className="my-4 w-[60%] mx-auto bg-gray-800 p-5 rounded-xl">
        <div className="flex items-center gap-8 mb-4">
          <Input
            placeholder="Type any keyword . . ."
            className="rounded-xl border-yel text-2xl px-5"
          />
          <GrSearchAdvanced className="text-yel text-4xl" />
        </div>

        {isFilter && (
          <div className="flex justify-between px-3">
            <div className="flex justify-center items-end gap-5">
              <Select
                title="Select meal type "
                allowClear
                placeholder="Select meal type..."
                className="w-48 mb-3 text-lg"
                options={options.mealTypes}
                showSearch
                value={filter?.mealType || undefined}
                onChange={(value: string) =>
                  setFilter((state: any) => ({ ...state, mealType: value }))
                }
              />
              <Select
                title="choose your cuisine"
                allowClear
                placeholder="Select cuisine..."
                className="w-48 mb-3 text-lg"
                options={options.cuisines}
                showSearch
                value={filter?.cuisine || undefined}
                onChange={(value: string) =>
                  setFilter((state: any) => ({ ...state, cuisine: value }))
                }
              />
              <div>
                <p className="text-center">
                  Max time to prepare :{" "}
                  <b className="text-yel">{filter?.maxReadyTime} Mins</b>
                </p>
                <Slider
                  max={120}
                  className="w-52"
                  onChange={(value) => {
                    setFilter((state: any) => ({
                      ...state,
                      maxReadyTime: value,
                    }));
                  }}
                  value={filter?.maxReadyTime}
                />
              </div>
            </div>

            <div
              className="flex text-lg gap-3 items-center border cursor-pointer text-gray-300 self-center hover:bg-yel hover:text-dark transition-all border-yel rounded-xl px-2 py-1"
              onClick={() => setShowFilterModal(true)}
            >
              <span>More</span>
              <LuSettings2 className="text-2xl" />
            </div>
          </div>
        )}

        <div className="text-center mt-5">
          <button
            className="px-6 py-3 bg-yel hover:bg-yellow-500 hover:scale-110 transition-all text-dark text-2xl font-semibold rounded-xl"
            onClick={() => submitFilters(true)}
          >
            Get Results
          </button>
        </div>
      </div>

      <Modal
        open={showFilterModal}
        footer={null}
        onCancel={() => setShowFilterModal(false)}
        className="my-modal"
        width="60vw"
      >
        <div className="p-4">
          <h1 className="text-yel font-semibold text-3xl text-center">
            All your choices
          </h1>

          <div>
            <div className="flex items-center justify-between gap-3 mt-5">
              <div className="border-t border-gray-400 w-1/3"></div>
              <p className="text-lg text-gray-400">Taste Matters</p>
              <div className="border-t border-gray-400 w-1/3"></div>
            </div>
            <div className="flex justify-around">
              <div>
                <p className="text-lg">What are u looking for</p>
                <Select
                  title="Select meal type "
                  allowClear
                  placeholder="Select meal type..."
                  className="w-48 my-2 text-lg"
                  options={options.mealTypes}
                  value={filter?.mealType}
                  showSearch
                  onChange={(value: string) =>
                    setFilter((state: any) => ({ ...state, mealType: value }))
                  }
                />
              </div>
              <div>
                <p className="text-lg">Choose favourite cuisine</p>
                <Select
                  title="choose your cuisine"
                  allowClear
                  placeholder="Select cuisine..."
                  className="w-48 my-2 text-lg"
                  options={options.cuisines}
                  showSearch
                  value={filter?.cuisine || undefined}
                  onChange={(value: string) =>
                    setFilter((state: any) => ({ ...state, cuisine: value }))
                  }
                />
              </div>
              <div>
                <p className="text-lg">Cuisine you don't want</p>
                <Select
                  title="Cuisine you don't like"
                  allowClear
                  placeholder="Exclude cuisine..."
                  className="w-48 my-2 text-lg"
                  options={options.excludeCuisines}
                  showSearch
                  value={filter?.excludeCuisine || undefined}
                  onChange={(value: string) =>
                    setFilter((state: any) => ({
                      ...state,
                      excludeCuisine: value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 mt-5">
              <div className="border-t border-gray-400 w-1/3"></div>
              <p className="text-lg text-gray-400">Diet Matters</p>
              <div className="border-t border-gray-400 w-1/3"></div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-lg">Choose your preferred diet</p>
                <Select
                  className="w-full text-lg"
                  allowClear
                  title="Choose your diet type"
                  placeholder="Select diet type..."
                  options={Options.dietTypes}
                  showSearch
                  value={filter?.diet || undefined}
                  onChange={(value: string) =>
                    setFilter((state: any) => ({ ...state, diet: value }))
                  }
                />
              </div>
              <div>
                <p className="text-center text-base">
                  Total callories range :{" "}
                  <b className="text-yel">
                    {filter?.minCalories + " - " + filter?.maxCalories}
                  </b>
                  (cal)
                </p>
                <Slider
                  range
                  max={1500}
                  min={0}
                  onChange={([low, high]) => {
                    setFilter((state: any) => ({
                      ...state,
                      minCalories: low,
                      maxCalories: high,
                    }));
                  }}
                  value={[filter?.minCalories, filter?.maxCalories]}
                />
              </div>
              <div>
                <p className="text-center text-base">
                  Protein in range :{" "}
                  <b className="text-yel">
                    {filter?.minProtein + " - " + filter?.maxProtein}
                  </b>{" "}
                  (g)
                </p>
                <Slider
                  range
                  max={100}
                  min={0}
                  onChange={([low, high]) => {
                    setFilter((state: any) => ({
                      ...state,
                      minProtein: low,
                      maxProtein: high,
                    }));
                  }}
                  value={[filter?.minProtein, filter?.maxProtein]}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-5">
              <div className="border-t border-gray-400 w-1/3"></div>
              <p className="text-lg text-gray-400">Requirements</p>
              <div className="border-t border-gray-400 w-1/3"></div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-lg">Include equipments </p>
                <Select
                  mode="tags"
                  placeholder="Enter equipments..."
                  className="w-80 text-lg"
                  allowClear
                  value={filter?.equipments || undefined}
                  onChange={(value) => {
                    setFilter((prev) => ({
                      ...prev,
                      equipments: value,
                    }));
                  }}
                  tokenSeparators={[","]}
                />
              </div>
              <div>
                <p className="text-center text-lg">
                  Max time to prepare :{" "}
                  <b className="text-yel">{filter?.maxReadyTime} Mins</b>
                </p>
                <Slider
                  className="w-80"
                  max={100}
                  min={0}
                  onChange={(value) => {
                    setFilter((state: any) => ({
                      ...state,
                      maxReadyTime: value,
                    }));
                  }}
                  value={filter?.maxReadyTime}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div>
                <p className="mb-1 text-lg">Ingredients you have</p>
                <Select
                  mode="tags"
                  placeholder="Enter ingredients..."
                  className="w-80 text-lg"
                  allowClear
                  value={filter?.ingredients || undefined}
                  onChange={(value) => {
                    setFilter((prev) => ({
                      ...prev,
                      ingredients: value,
                    }));
                  }}
                  tokenSeparators={[","]}
                />
              </div>
              <div>
                <p className="mb-1 text-lg">Ingredients you don't have</p>
                <Select
                  mode="tags"
                  placeholder="Exclude ingredients..."
                  className="w-80 text-lg"
                  allowClear
                  value={filter?.excludeIngredients || undefined}
                  onChange={(value) => {
                    console.log(value);
                    setFilter((prev) => ({
                      ...prev,
                      excludeIngredients: value,
                    }));
                  }}
                  tokenSeparators={[","]}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="border-t border-gray-400 w-1/3"></div>
              <p className="text-lg text-gray-400">Other Choices</p>
              <div className="border-t border-gray-400 w-1/3"></div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div>
                <p className="mb-1 text-lg">Intolerances you want to add </p>
                <Select
                  mode="multiple"
                  placeholder="Enter intolerances..."
                  className="w-80 text-lg"
                  allowClear
                  value={filter?.intolerances || undefined}
                  onChange={(value) => {
                    setFilter((prev) => ({
                      ...prev,
                      intolerances: value,
                    }));
                  }}
                  options={Options?.intolerances}
                  tokenSeparators={[","]}
                />
              </div>
              <div>
                <p className="text-center text-lg">
                  Max time to prepare :{" "}
                  <b className="text-yel">{filter?.maxReadyTime} Mins</b>
                </p>
                <Slider
                  className="w-80"
                  max={100}
                  min={0}
                  onChange={(value) => {
                    setFilter((state: any) => ({
                      ...state,
                      maxReadyTime: value,
                    }));
                  }}
                  value={filter?.maxReadyTime}
                />
              </div>
            </div>

            <div className="flex justify-center gap-8 border-2 border-yel rounded-xl p-3 w-3/4 mx-auto my-8">
              <div>
                <p className="mb-1 text-xl">Select sorting field </p>
                <Select
                  className="w-60"
                  allowClear
                  placeholder="Select sorting field..."
                  options={Options?.sortingOptions}
                  showSearch
                  value={filter?.sort || undefined}
                  onChange={(value) => {
                    setFilter((prev) => ({
                      ...prev,
                      sort: value,
                    }));
                  }}
                />
              </div>
              <div className="text-center">
                <p className="mb-1 text-xl text-center">
                  Select sorting direction{" "}
                </p>
                <Radio.Group
                  value={filter?.sortDirection}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      sortDirection: e.target.value,
                    }));
                  }}
                >
                  <Radio value="asc" className="text-xl">
                    Asc
                  </Radio>
                  <Radio value="desc" className="text-xl">
                    Desc
                  </Radio>
                </Radio.Group>
              </div>
            </div>

            <div className="text-center">
              <button
                className="px-6 py-3 bg-yel hover:bg-yellow-500 hover:scale-110 transition-all text-dark text-2xl font-semibold rounded-xl"
                onClick={() => submitFilters(true)}
              >
                Get Results
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Discover;
