import apiClient from "./apiClient";

export const registerUser = async (name, email, password, confirmPassword) => {
  return apiClient.post("/auth/register", {
    name,
    email,
    password,
    confirmPassword,
  });
};

export const loginUser = async (email, password) => {
  return apiClient.post("/auth/login", { email, password });
};

export const getDashboard = async () => {
  return apiClient.get("/auth/dashboard");
};
