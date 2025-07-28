import { getAllCategory, getAllCategoryByUser } from "../models/Category";
import { successResponse, errorResponse } from "@/utils/apiResponse";

export async function fetchAllCategory() {
  try {
    const data = await getAllCategory();
    return successResponse("Category fetched successfully", data, 201);
  } catch (error) {
    console.error("Error:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}

export async function fetchCategory(session) {
  try {
    const data = await getAllCategoryByUser(session);
    return successResponse("Category fetched successfully", data, 201);
  } catch (error) {
    console.error("Error:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}
