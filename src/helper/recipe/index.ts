import axios from "axios";
import { Random, Sample } from "../temp";
export { default as Options } from "./options";

// Create Axios instance
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000, // Set timeout in milliseconds
  params: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY2, // Default parameter
    lang: "en", // Default language parameter
  },
});

// Export functions for API calls
export default {
  getRandomRecipe: async () => {
    try {
      return Random;
      // const { data } = await client.get("/recipes/random", {
      //   params: {
      //     number: 5, // Override default parameters
      //     includeNutrition: false,
      //   },
      // });
      // return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getSampleRecipe: async () => {
    const { data } = await axios.get("/recipes/sample");
    return Sample;
  },
  getRecentRecipes: async () => {
    return Sample;
  },
};
