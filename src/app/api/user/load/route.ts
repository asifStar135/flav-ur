import { getUserFromRequest } from "@/helper";
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

    return NextResponse.json({
      success: true,
      message: "user is authenticated",
      user: user,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    const response = NextResponse.json({
      error: "Server error",
      status: 500,
    });
    response.cookies.delete("token");

    return response;
  }
};
