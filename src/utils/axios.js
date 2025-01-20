import axios from "axios";
export const baseDomain = "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL: baseDomain,
});

