// src/lib/api.js
import axios from "axios";
import { supabase } from "./supabaseClient";

// Création du client Axios
export const api = axios.create({
  baseURL: "/api", // ou ton URL d’API complète ex: http://localhost:4000/api
  withCredentials: true,
});

// Intercepteur pour ajouter le token d'auth Supabase (JWT)
api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
