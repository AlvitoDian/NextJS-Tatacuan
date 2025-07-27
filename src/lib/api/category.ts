import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const fetchCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/category`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};
