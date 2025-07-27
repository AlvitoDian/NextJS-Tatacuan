import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { createTransaction } from "@/lib/controllers/TransactionController";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return createTransaction(req, session);
}
