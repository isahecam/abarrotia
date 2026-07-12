import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = new Set(["/sign-in"]);
const DEFAULT_AUTHENTICATED_PATH = "/checkout";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = PUBLIC_PATHS.has(pathname);
  const cookies = getSessionCookie(request);

  if (!cookies && !isPublicPath) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (cookies && isPublicPath) {
    return NextResponse.redirect(new URL(DEFAULT_AUTHENTICATED_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
