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
  if (text?.length <= length) return text;
  return text?.substring(0, length - 2)?.trim() + "...";
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

export const getRandomAvatars = () => {
  const avatars = [
    "/assets/av1.png",
    "/assets/av2.png",
    "/assets/av3.png",
    "/assets/av4.png",
    "/assets/av5.png",
    "/assets/av6.png",
    "/assets/av7.png",
    "/assets/av8.png",
    "/assets/av9.png",
    "/assets/av10.png",
    "/assets/av11.png",
    "/assets/av12.png",
  ];
  // sort it in a random order;
  avatars.sort(() => Math.random() - 0.5);
  return avatars;
};

export { default as Recipe } from "./recipe";
