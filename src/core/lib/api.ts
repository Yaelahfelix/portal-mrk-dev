import axios from "axios";
import Cookie from "js-cookie";

// Axios instance dengan baseURL dan headers default
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper untuk mengekstrak pesan error
export function asErrorMessage(e: unknown): string {
  const error = e as { response?: { data?: { message?: string } }; message?: string };
  return error?.response?.data?.message ?? error?.message ?? "Unknown error";
}

// REQUEST INTERCEPTOR - Menambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? Cookie.get("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR - Handle error responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Jika token expired atau unauthorized
    if (
      error.response &&
      error.response?.status === 401 &&
      !error.config.url.includes("/login") &&
      !error.config.url.includes("/logout")
    ) {
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/auth/login")
      ) {
        // Clear token
        Cookie.remove("token");

        // Call logout endpoint dari backend
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`);
        } catch (e) {
          console.error("Error during logout:", e);
        }

        // Redirect ke login
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  },
);

// SWR Fetcher - menggunakan api instance yang sudah ada interceptor
export const fetcher = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

export default api;
