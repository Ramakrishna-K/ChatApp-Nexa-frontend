// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://nexa-chat-application.onrender.com/api",
//   withCredentials: true, // important for cookies / auth
// });

// export default axiosInstance;

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapp-backend-bpp7.onrender.com/api",
  withCredentials: true, // ✅ REQUIRED for cookies (JWT)
});


