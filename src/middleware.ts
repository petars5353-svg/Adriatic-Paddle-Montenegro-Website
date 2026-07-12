import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidSession } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the login page through.
  if (pathname === "/admin/login") return NextResponse.next();

  // Guard the dashboard.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const valid = await isValidSession(req.cookies.get(ADMIN_COOKIE)?.value);
    if (!valid) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
