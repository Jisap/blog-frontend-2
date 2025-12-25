
import axios from "axios";

export const bitblogApi = axios.create({
  baseURL: "http://localhost:3000/api/v1",

})

// Si las rutas de rootLayout requieren autenticación, se agregarian los interceptores
// que establecería el token en el header de cada solicitud

// bitblogApi.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );