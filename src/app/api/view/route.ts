import { postView } from "@/lib/controllers/ViewController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") || "unknown";
  const forwarded = req.headers.get("x-forwarded-for");
  const ip_address = forwarded ? forwarded.split(",")[0] : "unknown";

  return postView(req, userAgent, ip_address);
}
