import axios from "axios";


//DEV URL
//Comment on prod
export const API_URL = "http://localhost:10000/api";
//Uncomment on prod
//export const API_URL = "/api";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use(config => {
    if (config.headers)
        config.headers.Authorization = localStorage.getItem("session");
    return config;
});

export default $api;