import axios from "axios";
import { obtenerToken } from "../Auth/manejadorJWT";

export function configurarInterceptor(){
    axios.interceptors.request.use(
        (config) => {
            const token = obtenerToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, 
        (error) => {
            return Promise.reject(error);
        }
    );

}