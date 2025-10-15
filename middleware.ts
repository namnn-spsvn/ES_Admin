import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (req.nextUrl.pathname === "" && token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  if (!req.nextUrl.pathname.startsWith("/login") && !token) {
    return NextResponse.redirect(new URL(`/login`, req.url));
  }
}

export const config = {
  //   matcher: '/about/:path*',
  matcher: ["/login", "/home"],
};
