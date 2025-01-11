import { connect } from "@/config";
import { RecentItems } from "@/models";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({
        error: "User not authenticated",
        status: 401,
        success: false,
      });
    }
    const { searchParams } = req.nextUrl;
    const page = searchParams.get("page") || 0;

    const recentItems = await RecentItems.find({ userId: user.id })
      .sort({ updatedAt: -1 })
      .skip((page as number) * 10)
      .limit(10);

    return NextResponse.json({
      recentItems,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Server error",
      status: 500,
      success: false,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({
        error: "User not authenticated",
        status: 401,
        success: false,
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
    } = await req.json();

    const isUpdate = await RecentItems.updateOne(
      {
        userId: user.id,
        id,
      },
      {
        updatedAt: new Date(),
      }
    );
    console.log("Update => ", isUpdate);

    if (isUpdate?.modifiedCount) {
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Recent item updated successfully",
      });
    }

    await RecentItems.create({
      userId: user.id,
      id,
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
    return NextResponse.json({
      error: "Server error",
      status: 500,
      success: false,
    });
  }
};
