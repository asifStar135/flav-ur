import mongoose from "mongoose";

const cookBookModel = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    //  recipe Id for spoonacular
    id: {
      type: Number,
      required: true,
    },
    listName: {
      type: String,
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
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.cookbook ||
  mongoose.model("cookbook", cookBookModel);
