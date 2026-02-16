import axios from "axios";

// Reusable axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});