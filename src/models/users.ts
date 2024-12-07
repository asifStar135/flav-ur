import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20241009/ourmid/pngtree-customer-avatar-vector-art-png-image_14022857.png",
    },
    bio: {
      type: String,
      default: "I am a loyal user!",
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    preferences: {
      cuisine: {
        type: String,
      },
      diet: {
        type: String,
      },
      glutenFree: {
        type: Boolean,
        default: false,
      },
      dairyFree: {
        type: Boolean,
        default: false,
      },
    },
    recentItems: {
      type: [
        {
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
          visitTime: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      select: false,
    },
  },
  { timestamps: true }
);

// Check if the model exists before defining it
export default mongoose.models.users || mongoose.model("users", userModel);
