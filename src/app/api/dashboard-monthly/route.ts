import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { fetchDashboardMonthly } from "@/lib/controllers/DashboardController";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return fetchDashboardMonthly(session);
}
