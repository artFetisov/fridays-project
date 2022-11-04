import axios from "axios";

const baseLocalURL = 'http://localhost:7542/2.0/'

export const instance = axios.create({
    baseURL: baseLocalURL,
    withCredentials: true,
})