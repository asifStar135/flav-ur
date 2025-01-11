import { connect } from "@/config";
import { Cookbook } from "@/models";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser();
    const cookBooklist = await Cookbook.find({ userId: user?.id });

    const listMap = new Map();
    let notesCount = 0;
    cookBooklist.forEach((item) => {
      listMap.set(item.listName, (listMap.get(item.listName) || 0) + 1);
      notesCount += item.notes.length ? 1 : 0;
    });
    let listNames = [];
    //  iterate through the map and store {listName, count} in the listNames array
    for (let [listName, count] of listMap) {
      listNames.push({ listName, count });
    }
    listNames = listNames.sort(
      (a, b) => b.count - a.count // sort by count in descending orderß
    );

    return NextResponse.json({
      result: {
        total: cookBooklist.length,
        notes: notesCount,
        listNames,
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
