import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { NextRequest } from "next/server";
import { User } from "@/models";

export const generateToken = (
  userId: mongoose.Types.ObjectId,
  username: string
) => {
  // generate token using jwt token
  const token = jwt.sign({ userId, username }, process.env.TOKEN_SECRET!, {
    expiresIn: "10h",
  });
  return token;
};

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length - 2).trim() + "...";
};

export const validatePassword = async (
  enteredPassword: string,
  originalPassword: string
) => {
  return await bcryptjs.compare(enteredPassword, originalPassword);
};

// validate token using jwt token
export const validateToken: any = (token: string) => {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUserFromRequest = async (request: NextRequest) => {
  try {
    //  get user from cookies token
    const token = request.cookies.get("token");
    if (!token) return null;

    // validate token
    const decoded = validateToken(token.value);
    if (!decoded?.userId) return null;

    return { _id: "asbkjd" };

    // find user in db
    // const foundUser = await User.findById(decoded.userId);
    // if (!foundUser) return null;
    // return foundUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getRating = (score: number) => {
  return Number((score / 20).toFixed(1));
};

export const getTime = (minute: number) => {
  if (minute < 60) {
    return `${minute} Mins`;
  } else {
    const hour = minute / 60;
    return `${hour.toFixed(1)} Hrs`;
  }
};

export { default as Recipe } from "./recipe";
