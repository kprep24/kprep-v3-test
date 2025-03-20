"use client"

import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next/client";
import Cookies from "js-cookie"
const { APP_URL_PRODUCTION, APP_URL_TEST, NODE_ENV } = process.env;
const url = NODE_ENV === "development" ? APP_URL_TEST : APP_URL_PRODUCTION;

const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true,
});
// origin: ,
    axiosInstance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            const accessToken = Cookies.get("accessToken");
            if (accessToken) {
                config.headers.Authorization = `${accessToken}`;
                config.headers.origin = ["https://kprep.in", "http://localhost:3000"]
            }
            return config;
        },
        (error) => {
            console.error("Request Error:", error);
            return Promise.reject(error);
        }
    );

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status !== 200) {
            originalRequest._retry = true;
            try {
                const res = await axios.post("/api/admin/refresh-token");
                // Retrieve new token and retry request
                const newAccessToken = Cookies.get("accessToken");
                if (newAccessToken) {
                    originalRequest.headers.Authorization = `${newAccessToken}`;
                }
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Token Refresh Error:", refreshError);
                return Promise.reject(refreshError);
            }
        }

        console.error("Response Error:", error);
        return Promise.reject(error);
    }
);


export default axiosInstance;
