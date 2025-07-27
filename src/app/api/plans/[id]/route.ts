import { NextRequest } from "next/server";

import { fetchPlanById } from "@/lib/controllers/PlansController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return fetchPlanById(id);
}
