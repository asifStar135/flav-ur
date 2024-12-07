import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "user logged out",
      success: true,
      status: 200,
    });
    response.cookies.delete("token");

    return response;
  } catch (error) {
    return NextResponse.json({
      message: "Error in server",
      status: 500,
    });
  }
}
