import axios from "axios";


export const axiosInstance = axios.create({
    baseURL : "http://192.168.100.178:3000",
    timeout : 70000,
    timeoutErrorMessage : "Timeout"
})