"use client";
import RecipeCard from "@/components/RecipeCard";
import { truncateText } from "@/helper";
import { Recipe } from "@/services";
import { Options } from "@/helper";
import { Input, Modal, Radio, Select, Slider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { GrSearchAdvanced } from "react-icons/gr";
import { LuSettings2 } from "react-icons/lu";
import Link from "next/link";
import Loader from "@/components/Loader";
import InfiniteLoadingHook from "@/components/InfiniteLoadingHook";
const imageBaseUrl = "https://img.spoonacular.com/recipes/";

const Discover = () => {
  const [isFilter, setIsFilter] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterResult, setFilterResult] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [options, setOptions] = useState({
    cuisines: Options.cuisines,
    excludeCuisines: Options.cuisines,
    mealTypes: Options.mealTypes,
    diets: Options.dietTypes,
  });
  //  handling mobile devices
  const [isWide, setIsWide] = useState(true);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 800) setIsWide(false);
  }, []);

  //  infinite loading for both the part
  const filterDiv = useRef(null);
  const searchDiv = useRef(null);
  const pageNo = useRef(0),
    limit = useRef(5);
  const [loading, setLoading] = useState(false);

  InfiniteLoadingHook(filterDiv, () => submitFilters(false), loading);
  InfiniteLoadingHook(
    searchDiv,
    () => getSuggetion(searchQuery, false),
    loading
  );

  const [filter, setFilter] = useState(Options.defaultFilters);
  const [isFilterChanged, setIsFilterChanged] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const handleChangeInFilters = (name: string, value: any) => {
    setFilter((state) => ({ ...state, [name]: value }));
    setIsFilterChanged(true);
  };

  const handleClearFilter = () => {
    setFilter(Options.defaultFilters);
    setIsFilterChanged(false);
  };

  const submitFilters = async (isNew: boolean) => {
    setShowFilterModal(false);
    setLoading(true);
    const result = await Recipe?.getFilteredRecipes(
      pageNo.current,
      filter,
      searchQuery
    );
    if (isNew) {
      setFilterResult(result);
    } else {
      setFilterResult((prev) => prev?.concat(result));
    }
    setLoading(false);
    pageNo.current++;
  };

  const getSuggetion = async (query: string, isNew: boolean) => {
    if (isNew) limit.current = 5;
    else limit.current += 5;

    Recipe?.getTitleSuggestions(
      debouncedQuery.toLowerCase(),
      limit.current
    ).then((result) => {
      setSearchResult(result);
    });
  };

  const switchModes = (value: boolean) => {
    if (value == isFilter) return;
    setSearchQuery("");
    setIsFilter(value);
  };

  useEffect(() => {
    if (isFilter) return;
    const timerHandler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timerHandler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery?.length > 2) {
      getSuggetion(debouncedQuery, false);
    } else setSearchResult([]);
  }, [debouncedQuery]);

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

      <div className="flex w-4/5 xl:w-1/3 justify-between text-xl border border-yel mx-auto rounded-xl cursor-pointer">
        <div
          className={
            (isFilter ? "bg-yel text-dark" : "") +
            " rounded-l-lg p-2 w-1/2 text-center"
          }
          onClick={() => switchModes(true)}
        >
          Apply filters {isWide ? "with a query" : ""}
        </div>
        <div
          className={
            (isFilter == false ? "bg-yel text-dark" : "") +
            " rounded-r-lg p-2 w-1/2 text-center"
          }
          onClick={() => switchModes(false)}
        >
          Search recipes {isWide ? "by name" : ""}
        </div>
      </div>

      <div className="my-4 w-11/12 xl:w-[60%] mx-auto bg-gray-800 p-5 rounded-xl">
        <div className="flex items-center gap-5 xl:gap-8 mb-4">
          <Input
            placeholder={
              isFilter ? "Type anything to filter" : "Search recipes by name"
            }
            autoFocus
            className="rounded-xl border-yel text-2xl px-5"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            allowClear
          />
          <GrSearchAdvanced className="text-yel text-4xl" />
        </div>

        {isFilter ? (
          <div>
            <div className="flex justify-between xl:px-3">
              <div className="flex flex-wrap justify-center items-end gap-5">
                <Select
                  title="Select meal type "
                  allowClear
                  placeholder="Select meal type"
                  className="w-40 xl:w-48 mb-3 text-lg"
                  options={options.mealTypes}
                  showSearch
                  value={filter?.mealType || undefined}
                  onChange={(value: string) =>
                    handleChangeInFilters("mealType", value)
                  }
                />
                <Select
                  title="choose your cuisine"
                  allowClear
                  placeholder="Select cuisine"
                  className="w-40 xl:w-48 mb-3 text-lg"
                  options={options.cuisines}
                  showSearch
                  value={filter?.cuisine || undefined}
                  onChange={(value: string) =>
                    handleChangeInFilters("cuisine", value)
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
                      handleChangeInFilters("maxReadyTime", value);
                    }}
                    value={filter?.maxReadyTime}
                  />
                </div>

                <div
                  className="flex text-lg gap-3 items-center border cursor-pointer text-gray-300 self-center hover:bg-yel hover:text-dark transition-all border-yel rounded-xl px-2 py-1"
                  onClick={() => setShowFilterModal(true)}
                >
                  <span>More</span>
                  <LuSettings2 className="text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-10 mt-5">
              {isFilterChanged && (
                <button
                  className="px-6 py-2 border border-gray-400 hover:bg-gray-400 hover:text-gray-800 hover:scale-110 transition-all text-gray-400 text-2xl rounded-xl"
                  onClick={() => handleClearFilter()}
                >
                  Reset
                </button>
              )}
              <button
                className="px-6 py-2 bg-yel hover:bg-yellow-500 hover:scale-110 transition-all text-dark text-2xl font-semibold rounded-xl"
                onClick={() => submitFilters(true)}
              >
                Get Results
              </button>
            </div>
          </div>
        ) : (
          <div>
            {searchResult?.length > 0 ? (
              <div className="flex flex-col xl:w-2/3 gap-3 overflow-y-auto max-h-[50vh] scrollbar-hidden mx-auto">
                {searchResult?.map((item: any) => (
                  <div className="flex gap-3 items-center p-1 border border-t-0 rounded-full border-gray-600">
                    <img
                      src={
                        imageBaseUrl + item?.id + "-90x90." + item?.imageType
                      }
                      alt="Recipe search"
                      className="w-20 rounded-full border border-yel"
                    />
                    <h1 className="text-xl xl:text-2xl text-gray-300 hover:text-yel">
                      <Link href={"/recipe/" + item?.id}>
                        {truncateText(item?.title, 40)}
                      </Link>
                    </h1>
                  </div>
                ))}
              </div>
            ) : debouncedQuery?.length < 3 ? (
              <p className="text-2xl text-gray-300 text-center my-8">
                Enter at least 3 characters . .
              </p>
            ) : (
              <p className="text-2xl text-gray-400 my-8 text-center">
                No Result for '<span className="text-yel">{searchQuery}</span>'
                !
                <br /> Try something else{" "}
              </p>
            )}
          </div>
        )}
      </div>

      {/* SIMPLE RECCOMENDED RECIPES BASED ON FILTERS */}
      {filterResult?.length && isFilter ? (
        <div className="my-10 px-2 xl:p-10 w-11/12 mx-auto pb-5">
          <h1 className="text-3xl font-semibold mb-5 text-gray-300 text-center">
            -- Your <b className="text-yel">Filtered</b> Recipes --
          </h1>
          <div className="flex flex-wrap gap-3 xl:gap-6 justify-center">
            {filterResult?.map((recipe: any, index) => (
              <RecipeCard
                recipeItem={recipe}
                key={recipe?.id}
                cardWidth="w-[160px] xl:w-[270px]"
              />
            ))}
          </div>
          <div ref={filterDiv}>
            <Loader />
          </div>
        </div>
      ) : null}

      <Modal
        open={showFilterModal}
        footer={null}
        onCancel={() => setShowFilterModal(false)}
        className="my-modal"
        width={isWide ? "60vw" : "95vw"}
      >
        <div className="py-4 xl:px-4">
          <h1 className="text-yel font-semibold text-3xl text-center">
            All your choices
          </h1>

          <div>
            <div className="flex items-center justify-between gap-3 mt-5">
              <div className="border-t border-gray-400 w-1/4 xl:w-1/3"></div>
              <p className="text-lg text-gray-400">Taste Matters</p>
              <div className="border-t border-gray-400 w-1/4 xl:w-1/3"></div>
            </div>
            <div className="flex justify-around flex-wrap">
              <div>
                <p className="text-lg">
                  {isWide ? "What are u looking for" : "Choose meal type"}
                </p>
                <Select
                  title="Select meal type "
                  allowClear
                  placeholder="Select meal type..."
                  className="w-44 xl:w-52 my-2 text-lg"
                  options={options.mealTypes}
                  value={filter?.mealType || undefined}
                  showSearch
                  onChange={(value: string) =>
                    handleChangeInFilters("mealType", value)
                  }
                />
              </div>
              <div>
                <p className="text-lg">
                  Choose {isWide ? "favourite" : ""} cuisine
                </p>
                <Select
                  title="choose your cuisine"
                  allowClear
                  placeholder="Select cuisine..."
                  className="w-44 xl:w-52 my-2 text-lg"
                  options={options.cuisines}
                  showSearch
                  value={filter?.cuisine || undefined}
                  onChange={(value: string) =>
                    handleChangeInFilters("cuisine", value)
                  }
                />
              </div>
              <div>
                <p className="text-lg">Cuisine you don't want</p>
                <Select
                  title="Cuisine you don't like"
                  allowClear
                  placeholder="Exclude cuisine..."
                  className="w-52 my-2 text-lg"
                  options={options.excludeCuisines}
                  showSearch
                  value={filter?.excludeCuisine || undefined}
                  onChange={(value: string) =>
                    handleChangeInFilters("excludeCuisines", value)
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 mt-5">
              <div className="border-t border-gray-400 w-1/4 xl:w-1/3"></div>
              <p className="text-lg text-gray-400">Diet Matters</p>
              <div className="border-t border-gray-400 w-1/4 xl:w-1/3"></div>
            </div>

            <div className="flex items-center justify-center xl:justify-between gap-4 flex-wrap">
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
                    handleChangeInFilters("diet", value)
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
                    handleChangeInFilters("minCalories", low);
                    handleChangeInFilters("maxCalories", high);
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
                    handleChangeInFilters("minProtein", low);
                    handleChangeInFilters("maxProtein", high);
                  }}
                  value={[filter?.minProtein, filter?.maxProtein]}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-5">
              <div className="border-t border-gray-400 w-1/4 xl:w-1/3"></div>
              <p className="text-lg text-gray-400">Requirements</p>
              <div className="border-t border-gray-400 w-1/4 xl:w-1/3"></div>
            </div>

            <div className="flex items-center justify-center xl:justify-between flex-wrap gap-4">
              <div>
                <p className="mb-1 text-lg">Include equipments </p>
                <Select
                  mode="tags"
                  placeholder="Enter equipments..."
                  className="w-80 text-lg"
                  allowClear
                  value={filter?.equipments || undefined}
                  onChange={(value) => {
                    handleChangeInFilters("equipments", value);
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
                    handleChangeInFilters("maxReadyTime", value);
                  }}
                  value={filter?.maxReadyTime}
                />
              </div>
            </div>

            <div className="flex items-center justify-center xl:justify-between flex-wrap gap-4 mt-2">
              <div>
                <p className="mb-1 text-lg">Ingredients you have</p>
                <Select
                  mode="tags"
                  placeholder="Enter ingredients..."
                  className="w-80 text-lg"
                  allowClear
                  value={filter?.ingredients || undefined}
                  onChange={(value) => {
                    handleChangeInFilters("ingredients", value);
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
                    handleChangeInFilters("excludeIngredients", value);
                  }}
                  tokenSeparators={[","]}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="border-t border-gray-400 w-1/4 xl:w-1/3"></div>
              <p className="text-lg text-gray-400">Other Choices</p>
              <div className="border-t border-gray-400 w-1/4 xl:w-1/3"></div>
            </div>

            <div className="flex items-center justify-center xl:justify-between flex-wrap gap-4 mt-2">
              <div>
                <p className="mb-1 text-lg">Intolerances you want to add </p>
                <Select
                  mode="multiple"
                  placeholder="Enter intolerances..."
                  className="w-80 text-xl"
                  allowClear
                  showSearch={false}
                  value={filter?.intolerances || undefined}
                  onChange={(value) => {
                    handleChangeInFilters("intolerances", value);
                  }}
                  options={Options?.intolerances}
                  tokenSeparators={[","]}
                />
              </div>
              <div>
                <p className="text-center text-lg">
                  Servings you want to prepare :{" "}
                  <b className="text-yel">
                    {" "}
                    {"(" +
                      filter?.minServings +
                      " - " +
                      filter?.maxServings +
                      ")"}
                  </b>
                </p>
                <Slider
                  className="w-80"
                  max={150}
                  range
                  min={0}
                  onChange={([min, max]) => {
                    handleChangeInFilters("minServings", min);
                    handleChangeInFilters("maxServings", max);
                  }}
                  value={[filter?.minServings, filter?.maxServings]}
                />
              </div>
            </div>

            <div className="flex justify-center flex-wrap gap-8 border-2 border-yel rounded-xl p-3 w-3/4 mx-auto my-8">
              <div>
                <p className="mb-1 text-xl">Sort Results by </p>
                <Select
                  className="w-60 text-2xl"
                  allowClear
                  placeholder="Select sorting field..."
                  options={Options?.sortingOptions}
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
                <p className="mb-1 text-xl text-center">Sorting order </p>
                <Radio.Group
                  value={filter?.sortDirection}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      sortDirection: e.target.value,
                    }));
                  }}
                >
                  <Radio value="asc" className="text-2xl">
                    Asc
                  </Radio>
                  <Radio value="desc" className="text-2xl">
                    Desc
                  </Radio>
                </Radio.Group>
              </div>
            </div>

            <div className="flex items-center justify-center gap-10 mt-5">
              {isFilterChanged && (
                <button
                  className="px-6 py-2 border border-gray-400 hover:bg-gray-400 hover:text-gray-800 hover:scale-110 transition-all text-gray-400 text-2xl rounded-xl"
                  onClick={() => handleClearFilter()}
                >
                  Reset
                </button>
              )}
              <button
                className="px-6 py-2 bg-yel hover:bg-yellow-500 hover:scale-110 transition-all text-dark text-2xl font-semibold rounded-xl"
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
