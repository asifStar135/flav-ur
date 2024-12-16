import { connect } from "@/config";
import { Cookbook } from "@/models";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

connect();

export const PUT = async (req: NextRequest) => {
  try {
    // check user first
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({
        error: "User not authenticated",
        status: 401,
      });
    }

    const { id, notes } = await req.json();
    const updatedRecipe = await Cookbook.updateOne(
      { userId: user.id, id },
      { notes }
    );

    if (updatedRecipe.upsertedCount) {
      return NextResponse.json({
        status: 200,
        message: "Recipe notes updated successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Recipe not found",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Server Error",
    });
  }
};
