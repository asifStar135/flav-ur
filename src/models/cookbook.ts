import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  user_id: {
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
    required: true,
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
});

export default mongoose.models.users || mongoose.model("users", userModel);
