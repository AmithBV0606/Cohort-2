import { NextRequest, NextResponse } from "next/server";

let count = 0;

// export function middleware(req: NextRequest) {
//   count++;
//   console.log("The number of requests is ", count);
//   return NextResponse.next();
// }

// export const config = {
//     matcher: "/api/:path*",
// }

export function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname);
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }
}