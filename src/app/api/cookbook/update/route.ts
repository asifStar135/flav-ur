import { connect } from "@/config";
import { Cookbook } from "@/models";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

connect();

export const PUT = async (req: NextRequest) => {
  try {
    // check user first
    const user = await currentUser();

    const { recipeId, notes, listName } = await req.json();

    if (listName?.length == 0) {
      const update = await Cookbook.deleteOne({
        id: recipeId,
        userId: user?.id,
      });
      if (update?.deletedCount)
        return NextResponse.json({
          status: 200,
          message: "Recipe deleted successfully",
          success: true,
        });
      else
        return NextResponse.json({
          status: 400,
          error: "Failed to delete item",
        });
    }
    const update = await Cookbook.updateOne(
      { id: recipeId, userId: user?.id },
      { $set: { notes, listName } }
    );

    return NextResponse.json({
      status: 200,
      message: "Recipe updated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Server Error",
    });
  }
};
