import client from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // body
  const body = await req.json();
  console.log("Body : ", body);

  // headers
  // const headers = req.headers.get("Authorization");
  // console.log("Headers : ", headers);

  // Params
  // const params = req.nextUrl.searchParams.get("name");
  // console.log("PARAMS : ", params)

  const response = await client.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  if (response) {
    return NextResponse.json({
      id: response.id,
      name: response.name,
      email: response.email,
      password: response.password,
    });
  } else {
    return NextResponse.json({
      message: "Failed to signup as the email id already exists",
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const users = await client.user.findMany();

    return NextResponse.json({
      users,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error while fetching the data",
    });
  }
}
