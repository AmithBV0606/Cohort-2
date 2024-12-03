import { NextRequest, NextResponse } from "next/server";

// Never make it a default export!!
export function GET(
  req: NextRequest, 
  { params }: { params: { authRoutes: string[] } }
) {
    console.log(params)
//   console.log(args.params.authRoutes)
  return NextResponse.json({
    message: "Page doesn't exists!!",
  });
}