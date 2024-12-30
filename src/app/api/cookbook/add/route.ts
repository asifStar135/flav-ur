import { connect } from "@/config";
import { Cookbook } from "@/models";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({
        error: "User not authenticated",
        status: 401,
      });
    }
    const {
      id,
      image,
      title,
      servings,
      readyInMinutes,
      spoonacularScore,
      healthScore,
      vegetarian,
      notes,
      listName,
    } = await req.json();

    // Check if recipe already exists in the database
    const ifExists = await Cookbook.findOne({
      userId: user.id,
      id,
    });
    if (ifExists) {
      return NextResponse.json({
        error: "Recipe already exists",
        status: 400,
      });
    }

    // Create new recipe in the database
    await Cookbook.create({
      userId: user.id,
      id,
      image,
      title,
      servings,
      readyInMinutes,
      spoonacularScore,
      healthScore,
      vegetarian,
      notes,
      listName,
    });

    return NextResponse.json({
      status: 200,
      message: "Recipe added successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Server Error",
    });
  }
};
