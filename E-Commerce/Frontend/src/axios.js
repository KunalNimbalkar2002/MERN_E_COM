import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // You can modify the response here if needed
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response.status === 401) {
      // Handle unauthorized errors, for example, redirect to login
      console.error("Unauthorized access - possibly redirect to login");
    }
    return Promise.reject(error);
  }
);

export default instance;
