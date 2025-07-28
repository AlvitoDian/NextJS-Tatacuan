import { fetchAllCategory } from "@/lib/controllers/CategoryController";

export async function GET() {
  return fetchAllCategory();
}
