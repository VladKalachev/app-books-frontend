import axios from "axios";
import { AuthResponse } from "../types/user";
import { toast } from "react-toastify";

export const API_URL = "https://localhost:7000/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error?.response?.data) {
      console.log(error.response.data);
      toast(error.response.data);
    }

    const originalRequest = error.config;
    if (
      (error.response.status = 401 && error.config && !error.config._isRetry)
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${API_URL}/user/refresh`,
          { withCredentials: true }
        );
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.log("Не авторизован!");
      }
    }
    throw error;
  }
);

export default $api;
