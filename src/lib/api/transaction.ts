import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const createTransaction = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/transaction`, payload);
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createTransactionPublic = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/transaction-public`, payload);
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
