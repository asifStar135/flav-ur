import { connect } from "@/config";
import { Cookbook } from "@/models";

import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const listName = searchParams.get("listName") || "all";
    const page = Number(searchParams.get("page")) || 0;
    const limit = Number(searchParams.get("limit")) || 5;

    const user = await currentUser();

    const result = await Cookbook?.find({
      userId: user?.id,
      ...(listName === "all" ? {} : { listName }),
    })
      .sort({ createdAt: -1 })
      .skip(limit * page)
      .limit(limit);

    return NextResponse.json({
      recipes: result,
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
