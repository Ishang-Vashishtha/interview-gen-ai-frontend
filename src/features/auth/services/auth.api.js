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
    console.log("error in register request", error);
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
    console.log("error in login request", error);
  }
}

export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.log("error in logout request", error);
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (error) {
    console.log("error in get-me request", error);
  }
}
