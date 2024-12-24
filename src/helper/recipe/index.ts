import axios from "axios";
import { Random, Sample } from "../temp";
import toast from "react-hot-toast";
export { default as Options } from "./options";

// Create Axios instance
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // Set timeout in milliseconds
  params: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY2, // Default parameter
  },
});

// Export functions for API calls
export default {
  getRecipeInformation: async (recipeId: string) => {
    try {
      const { data } = await client.get(`/recipes/${recipeId}/information`, {
        params: {
          includeNutrition: true,
        },
      });

      return data;
    } catch (error) {
      toast.error("Failed to fetch recipe information.");
      console.error("Error:", error);
      return null;
    }
  },
  getFilteredRecipes: async (
    pageNo: number,
    filters: any,
    searchQuery: string
  ) => {
    try {
      const { data } = await client.get("/recipes/complexSearch", {
        params: {
          query: searchQuery,
          type: filters?.mealType,
          cuisine: filters?.cuisine,
          excludeCuisine: filters?.excludeCuisine,
          diet: filters?.diet,
          intolerances: filters?.intolerances,
          equipments: filters?.equipments,
          ingredients: filters?.ingredients,
          excludeIngredients: filters?.excludeIngredients,
          minCalories: filters?.minCalories,
          maxCalories: filters?.maxCalories,
          minProtein: filters?.minProtein,
          maxProtein: filters?.maxProtein,
          maxReadyTime: filters?.maxReadyTime,
          minServings: filters?.minServings,
          maxServings: filters?.maxServings,
          sort: filters?.sort,
          sortDirection: filters?.sortDirection,
          addRecipeInformation: true,
          number: 10,
          offset: pageNo * 10,
        },
      });

      return data?.results;
    } catch (error) {}
  },
  getTitleSuggestions: async (query: string) => {
    try {
      const { data } = await client.get("/recipes/autocomplete", {
        params: {
          query,
          number: 25,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch title suggestions.");
      return null;
    }
  },
  getRecommendedRecipes: async (pageNo: number, preferences: any) => {
    try {
      const { data } = await client.get("/recipes/complexSearch", {
        params: {
          cuisine: preferences?.cuisine,
          diet: preferences?.diet,
          addRecipeInformation: true,
          intolerences: `${preferences?.glutenFree ? "Gluten," : ""}${
            preferences?.dairyFree ? "Dairy," : ""
          } ${preferences?.allergies}`,
          number: 10,
          offset: pageNo * 10,
        },
      });

      return data?.results;
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch recommended recipes.");
      return null;
    }
  },
  getRandomRecipe: async () => {
    try {
      const { data } = await client.get("/recipes/random", {
        params: {
          number: 5, // Override default parameters
          includeNutrition: false,
        },
      });
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  addRecentRecipe: async (recipeItem: any) => {
    try {
      const response = await axios.post("/api/recipe/recent", recipeItem);
      if (response.data.success) {
        return true;
      } else toast.error(response.data.error);
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  fetchRecentRecipe: async (page: number) => {
    try {
      const { data } = await axios.get(`/api/recipe/recent?page=${page}`);
      if (data.success) {
        if (data?.recentItems?.length == 0) {
          toast.error("No more recent recipes found.");
        }
        return data?.recentItems;
      } else toast.error(data.error);
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getSampleRecipe: async () => {
    const { data } = await axios.get("/api/recipes/sample");
    return Sample;
  },
  getRecentRecipes: async () => {
    return Sample;
  },
};
