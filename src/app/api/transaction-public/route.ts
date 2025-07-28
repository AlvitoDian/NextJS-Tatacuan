import { NextRequest } from "next/server";

import { createTransactionPublic } from "@/lib/controllers/TransactionController";

export async function POST(req: NextRequest) {
  return createTransactionPublic(req);
}
