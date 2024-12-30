import { Cookbook } from "@/models";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const recipeId = searchParams.get("recipeId");
    const user = await currentUser();

    const result = await Cookbook?.findOne({ id: recipeId, userId: user?.id });
    let listNames = await Cookbook?.find({
      userId: user?.id,
    });

    listNames = listNames?.map((item: any) => item?.listName);
    const uniqueLists = [...new Set(listNames)];

    return NextResponse.json({
      details: result
        ? { listName: result.listName, notes: result.notes }
        : null,
      listNames: uniqueLists,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Server error",
      status: 500,
    });
  }
};
