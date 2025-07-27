import { getAllCategory } from "../models/Category";
import { successResponse, errorResponse } from "@/utils/apiResponse";

export async function fetchCategory(session) {
  try {
    const data = await getAllCategory(session);
    return successResponse("Category fetched successfully", data, 201);
  } catch (error) {
    console.error("Error:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}
