import { successResponse, errorResponse } from "@/utils/apiResponse";
import { getDashboard, getTransactionAmountByMonth } from "../models/Dashboard";

export async function fetchDashboard(session) {
  try {
    const cards = await getDashboard(session);
    return successResponse("Dashboard fetch successfully", cards, 201);
  } catch (error) {
    console.error("Error fetching users:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}

export async function fetchDashboardMonthly(session) {
  try {
    const cards = await getTransactionAmountByMonth(session);
    return successResponse("Dashboard fetch successfully", cards, 201);
  } catch (error) {
    console.error("Error fetching users:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}
