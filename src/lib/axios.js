// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://nexa-chat-application.onrender.com/api",
//   withCredentials: true, // important for cookies / auth
// });

// export default axiosInstance;

// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "https://chatapp-backend-bpp7.onrender.com/api",
//   withCredentials: true, // ✅ REQUIRED for cookies (JWT)
// });

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapp-backend-bpp7.onrender.com/api",
  withCredentials: false, // set true only if using cookies
});

/* ======================
   REQUEST INTERCEPTOR
====================== */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


