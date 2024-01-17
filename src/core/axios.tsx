import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://dev.virtualearth.net/REST/v1",
    timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
    console.log(config);
    config.params = {
        ...config.params,
        key: import.meta.env.VITE_BING_MAPS_KEY,
    };
    return config;
});

export default axiosInstance;