import { Cookbook } from "@/models";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser();
    const cookBooklist = await Cookbook.find({ userId: user?.id });

    const listNames = new Set();
    let notesCount = 0;
    cookBooklist.forEach((item) => {
      listNames.add(item.listName);
      notesCount += item.notes.length ? 1 : 0;
    });

    return NextResponse.json({
      result: {
        total: cookBooklist.length,
        notes: notesCount,
        listNames: listNames.size,
      },
      success: true,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Server error",
      status: 500,
    });
  }
};
