import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup"];

export const middleware = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token");
    const isPublic = publicRoutes.includes(req.nextUrl.pathname);

    if (!token && !isPublic)
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    else if (token && isPublic)
      return NextResponse.redirect(new URL("/", req.nextUrl));
  } catch (err) {
    NextResponse.redirect(new URL("/login", req.nextUrl));
  }
};

export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/discover", "/cookbook"],
};
