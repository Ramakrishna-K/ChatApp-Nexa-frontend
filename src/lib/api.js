// import { axiosInstance } from "./axios";

// /* ======================
//    AUTH
// ====================== */

// export const signup = async (signupData) => {
//   const response = await axiosInstance.post("/auth/signup", signupData);
//   return response.data;
// };

// export const login = async (loginData) => {
//   const response = await axiosInstance.post("/auth/login", loginData);
//   return response.data;
// };

// export const logout = async () => {
//   const response = await axiosInstance.post("/auth/logout");
//   return response.data;
// };

// export const getAuthUser = async () => {
//   try {
//     const res = await axiosInstance.get("/auth/me");
//     return res.data;
//   } catch (error) {
//     console.log("Error in getAuthUser:", error);
//     return null;
//   }
// };

// export const completeOnboarding = async (userData) => {
//   const response = await axiosInstance.post("/auth/onboarding", userData);
//   return response.data;
// };

// /* ======================
//    USERS & FRIENDS
// ====================== */

// export async function getUserFriends() {
//   const response = await axiosInstance.get("/users/friends");
//   return response.data;
// }

// export async function getRecommendedUsers() {
//   const response = await axiosInstance.get("/users");
//   return response.data;
// }

// export async function getOutgoingFriendReqs() {
//   const response = await axiosInstance.get("/users/outgoing-friend-requests");
//   return response.data;
// }

// export async function sendFriendRequest(userId) {
//   const response = await axiosInstance.post(
//     `/users/friend-request/${userId}`
//   );
//   return response.data;
// }

// export async function getFriendRequests() {
//   const response = await axiosInstance.get("/users/friend-requests");
//   return response.data;
// }

// export async function acceptFriendRequest(requestId) {
//   const response = await axiosInstance.put(
//     `/users/friend-request/${requestId}/accept`
//   );
//   return response.data;
// }

// /* ======================
//    CHAT
// ====================== */

// export async function getStreamToken() {
//   const response = await axiosInstance.get("/chat/token");


//   return response.data;
// }

import { axiosInstance } from "./axios";

/* ======================
   AUTH
====================== */

export const signup = async (signupData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", signupData);
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw error; // re-throw so caller knows it failed
  }
};

export const login = async (loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error;
  }
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.error("Error in getAuthUser:", error.response?.data || error.message);
    return null; // return null if user is not authenticated
  }
};

export const completeOnboarding = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/onboarding", userData);
    return response.data;
  } catch (error) {
    console.error("Onboarding failed:", error.response?.data || error.message);
    throw error;
  }
};

/* ======================
   USERS & FRIENDS
====================== */

export const getUserFriends = async () => {
  try {
    const response = await axiosInstance.get("/users/friends");
    return response.data;
  } catch (error) {
    console.error("Fetching friends failed:", error.response?.data || error.message);
    return []; // fallback to empty array
  }
};

export const getRecommendedUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Fetching recommended users failed:", error.response?.data || error.message);
    return [];
  }
};

export const getOutgoingFriendReqs = async () => {
  try {
    const response = await axiosInstance.get("/users/outgoing-friend-requests");
    return response.data;
  } catch (error) {
    console.error("Fetching outgoing friend requests failed:", error.response?.data || error.message);
    return [];
  }
};

export const sendFriendRequest = async (userId) => {
  try {
    const response = await axiosInstance.post(`/users/friend-request/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Sending friend request failed:", error.response?.data || error.message);
    throw error;
  }
};

export const getFriendRequests = async () => {
  try {
    const response = await axiosInstance.get("/users/friend-requests");
    return response.data;
  } catch (error) {
    console.error("Fetching friend requests failed:", error.response?.data || error.message);
    return [];
  }
};

export const acceptFriendRequest = async (requestId) => {
  try {
    const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
    return response.data;
  } catch (error) {
    console.error("Accepting friend request failed:", error.response?.data || error.message);
    throw error;
  }
};

/* ======================
   CHAT
====================== */

export const getStreamToken = async () => {
  try {
    const response = await axiosInstance.get("/chat/token");
    return response.data;
  } catch (error) {
    console.error("Fetching chat token failed:", error.response?.data || error.message);
    return null;
  }
};
