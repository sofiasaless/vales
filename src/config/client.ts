import { API_URL } from "@env";
import axios from "axios";
import { auth } from "./firebase.config";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await auth.currentUser?.getIdToken();

  // agora o token do auth firebase vai ser enviado
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});