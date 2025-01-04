import axios from "axios";
import toast from "react-hot-toast";

export default {
  updateInCookbook: async (
    recipeId: string,
    notes: string,
    listName: string
  ) => {
    try {
      const { data } = await axios.put(`/api/cookbook/update`, {
        recipeId,
        notes,
        listName,
      });

      return data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to update/delete recipe in cookbook.");
      return false;
    }
  },
  getCookbookStats: async () => {
    try {
      const { data } = await axios.get(`/api/cookbook/stats`);

      return data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch cookbook stats.");
      return null;
    }
  },
  addToCookBook: async (
    recipeDetails: any,
    listName: string,
    notes: string
  ) => {
    try {
      const { data } = await axios.post("/api/cookbook/add", {
        ...recipeDetails,
        listName,
        notes,
      });

      return data;
    } catch (err) {
      console.error(err);
      toast.error("Failed to add recipe to cookbook.");
      return false;
    }
  },
  getCookbookDetails: async (recipeId: string) => {
    try {
      const { data } = await axios.get("/api/cookbook/getDetails", {
        params: {
          recipeId,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getRecipesOfListCookbook: async (listName: string) => {
    try {
      console.log("called getrecipeslistcookbook")
      const { data } = await axios.get("/api/cookbook/fetch", {
        params: {
          listName,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
