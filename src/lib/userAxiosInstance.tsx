import axios, { InternalAxiosRequestConfig } from "axios";
const { APP_URL_PRODUCTION, APP_URL_TEST, NODE_ENV } = process.env;
const url = NODE_ENV === "development" ? APP_URL_TEST : APP_URL_PRODUCTION;
const UaxiosInstance = axios.create({
    baseURL: url,
    withCredentials: true,
});
// origin: ,
UaxiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const accessToken = "xyz";
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

export default UaxiosInstance;
