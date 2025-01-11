import axios from "axios";
import toast from "react-hot-toast";

export default {
  addRecentRecipe: async (recipeItem: any) => {
    try {
      const response = await axios.post("/api/recent", recipeItem);
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
      const { data } = await axios.get(`/api/recent?page=${page}`);
      if (data.success) {
        return data?.recentItems;
      } else toast.error(data.error);
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
