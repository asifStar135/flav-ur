import { connect } from "@/config";
import { generateToken, validatePassword } from "@/helper";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found", status: 404 });
    }
    console.log(user);

    const isValidPassword = await validatePassword(password, user.password);
    console.log("IsValidPassword", isValidPassword);
    if (!isValidPassword) {
      return NextResponse.json({
        error: "Invalid credentials ",
        status: 401,
      });
    }

    const token = generateToken(user._id, user.username);

    const res = NextResponse.json({
      success: true,
      message: "User logged in successfully",
      user: user,
      status: 200,
    });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 3600,
      sameSite: "strict",
    });

    return res;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      error: "Server Error",
      status: 500,
    });
  }
}
