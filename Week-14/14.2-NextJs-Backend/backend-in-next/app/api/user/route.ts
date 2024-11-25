import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const client = new PrismaClient();

export function GET() {
  return Response.json({ name: "Amith", email: "amithrao0606@gmail.com" });
}

export async function POST(req: NextRequest) {
  // Extract the body :
  const body = await req.json();

  try {
    // Store the body in the database
  const response = await client.user.create({
    data:{
      username: body.username,
      password: body.password
    }
  });

  return Response.json({
    message: "You are logged in!!",
  });
  } catch (error) {
    console.log(error)
  }
}