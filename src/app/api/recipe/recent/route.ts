import { getUserFromRequest } from "@/helper";
import { RecentItems } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({
        error: "User not found",
        status: 404,
      });
    }

    const recentItems = await RecentItems.find({
      userId: user._id,
    })
      .sort({ updatedAt: -1 })
      .limit(10);

    return NextResponse.json({
      status: 200,
      success: true,
      recentItems: recentItems,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error", status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({
        error: "User not found",
        status: 404,
      });
    }

    const {
      recipeId,
      image,
      title,
      servings,
      readyInMinutes,
      spoonacularScore,
      healthScore,
      vegetarian,
    } = await req.json();

    const isUpdate = await RecentItems.updateOne(
      {
        userId: user._id,
        recipeId,
      },
      {
        updatedAt: new Date(),
      }
    );
    if (isUpdate) {
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Recent item updated successfully",
      });
    }

    await RecentItems.create({
      userId: user._id,
      recipeId,
      image,
      title,
      servings,
      readyInMinutes,
      spoonacularScore,
      healthScore,
      vegetarian,
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Recent item added successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error", status: 500 });
  }
};
