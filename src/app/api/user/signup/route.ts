import { connect } from "@/config/index";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { signupEmail } from "@/helper/email";

connect();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        error: "Email already exists",
        success: false,
        status: 400,
      });
    }

    existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({
        error: "Username already exists",
        success: false,
        status: 400,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    console.log(newUser);

    const response = await signupEmail(newUser);
    console.log("Email updated -> ", response);

    return NextResponse.json({
      status: 200,
      message: "User Signed up successfully",
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    NextResponse.json({ error: "Server error", status: error.status });
  }
}
