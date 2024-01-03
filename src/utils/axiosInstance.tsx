import axios from "axios";


export const axiosInstance = axios.create({
    baseURL : "http://10.1.40.155:3000",
    timeout : 70000,
    timeoutErrorMessage : "Timeout"
})