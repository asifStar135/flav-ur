import { Cookbook, RecentItems } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    // get user id from query params
    const userId = req.nextUrl.searchParams.get("userId");

    //  delete recent items and cookbooks
    await Cookbook.deleteMany({
      userId,
    });

    await RecentItems.deleteMany({
      userId,
    });

    return NextResponse.json({
      status: 200,
      message: "User details deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Server Error",
    });
  }
};
