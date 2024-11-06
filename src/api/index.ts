import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the base URL
const baseURL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000/api"; // Default fallback URL

// Create an Axios instance
const api = axios.create({
  baseURL,
  headers: {
    // Add any default headers here (optional)
  },
});

// Define the response structure for the refresh token endpoint
interface RefreshTokenResponse {
  accessToken: string;
}

// Function to refresh the access token
const refreshToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");
  
  // Ensure refreshToken is not null
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response: AxiosResponse<RefreshTokenResponse> = await api.post("/auth/refresh-token", {
    refreshToken,
  });
  
  const { accessToken } = response.data;
  localStorage.setItem("token", accessToken);
  
  return accessToken;
};

// Axios request interceptor
//@ts-ignore
api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    //@ts-ignore
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Axios response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for a forbidden response and retry the request with a new token
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newAccessToken = await refreshToken();
        axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;