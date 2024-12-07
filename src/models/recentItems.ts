import mongoose from "mongoose";

const RecentItemsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    recipeId: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    healthScore: {
      type: Number,
      default: 0,
    },
    vegetarian: {
      type: Boolean,
      default: false,
    },
    servings: {
      type: Number,
    },
    readyInMinutes: {
      type: Number,
    },
    spoonacularScore: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.recentItems ||
  mongoose.model("recentItems", RecentItemsSchema);
