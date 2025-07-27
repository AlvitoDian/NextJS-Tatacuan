import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const userRegist = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/register`, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
};

export const fetchUserByEmail = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
