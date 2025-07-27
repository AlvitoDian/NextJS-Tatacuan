import { registerUser } from "@/lib/controllers/UserController";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return registerUser(req);
}
