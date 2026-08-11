import axios from "axios";

const api = axios.create({
  baseURL: "https://interview-gen-ai-backend.onrender.com",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "error in register request",
    );
  }
}

export async function verifyRegisterOtp({ email, otp }) {
  try {
    const response = await api.post("/api/auth/verify-register-otp", {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "error in verify otp request",
    );
  }
}

export async function login({ email, password }) {
  console.log("Calling API:", email);
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "error in login request");
  }
}

export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "error in logout request");
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "error in get-me request");
  }
}
