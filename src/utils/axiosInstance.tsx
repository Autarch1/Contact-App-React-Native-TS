import axios from "axios";


export const axiosInstance = axios.create({
    baseURL : "http://10.1.40.101:3000",
    timeout : 70000,
    timeoutErrorMessage : "Timeout"
})