import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://nexa-chat-application.onrender.com/api",
  withCredentials: true, // important for cookies / auth
});

export default axiosInstance;
