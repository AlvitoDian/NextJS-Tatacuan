import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const fetchDashboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};

export const fetchDashboardMonthly = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard-monthly`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};

export const fetchDashboardRecent = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard-recent`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};
