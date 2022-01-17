import axios from "axios";
import useTokenStore from "../modules/auth/useTokenStore";

let baseUrl = process.env.NEXT_PUBLIC_API_URL;
if (baseUrl === undefined) {
  baseUrl = "http://localhost:5000/api";
}

const privateAgent = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const publicAgent = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

privateAgent.interceptors.request.use(
  (config) => {
    const accessToken = useTokenStore.getState().accessToken;
    if (accessToken) {
      config.headers["x-auth-token"] = accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export { privateAgent, publicAgent };
