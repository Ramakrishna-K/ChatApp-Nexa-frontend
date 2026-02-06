// import { createContext, useContext, useState } from "react";

// const AvatarContext = createContext();

// export const AvatarProvider = ({ children }) => {
//   const [avatar, setAvatar] = useState("/avatar.png"); // default

//   const changeAvatar = (file) => {
//     const imageURL = URL.createObjectURL(file);
//     setAvatar(imageURL);
//   };

//   return (
//     <AvatarContext.Provider value={{ avatar, changeAvatar }}>
//       {children}
//     </AvatarContext.Provider>
//   );
// };

// export const useAvatar = () => useContext(AvatarContext);

// import { createContext, useContext, useState } from "react";

// const AppContext = createContext(null);

// export const AppProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [avatar, setAvatar] = useState("/avatar.png");

//   const changeAvatar = (file) => {
//     const imageURL = URL.createObjectURL(file);
//     setAvatar(imageURL);
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         setUser,
//         avatar,
//         changeAvatar,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// /* ✅ MUST BE NAMED EXPORT */
// export const useAuth = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAuth must be used inside AppProvider");
//   }
//   return context;
// };

// /* (optional) */
// export const useAvatar = () => {
//   return useContext(AppContext);
// };



// import { createContext, useContext, useEffect, useState } from "react";
// import useAuthUser from "../hooks/useAuthUser";

// const AppContext = createContext(null);

// export const AppProvider = ({ children }) => {
//   const { authUser, isLoading } = useAuthUser();

//   const [user, setUser] = useState(null);
//   const [avatar, setAvatar] = useState("/avatar.png");

//   /* =========================
//      Sync React Query → Context
//   ========================== */
//   useEffect(() => {
//     if (authUser) {
//       setUser(authUser);

//       // auto sync avatar from backend
//       if (authUser.profilePic) {
//         setAvatar(authUser.profilePic);
//       }
//     }
//   }, [authUser]);

//   /* =========================
//      Avatar Helpers
//   ========================== */
//   const changeAvatar = (fileOrUrl) => {
//     // If backend URL
//     if (typeof fileOrUrl === "string") {
//       setAvatar(fileOrUrl);
//       return;
//     }

//     // If file upload (preview)
//     const imageURL = URL.createObjectURL(fileOrUrl);
//     setAvatar(imageURL);
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         setUser,
//         avatar,
//         setAvatar,
//         changeAvatar,
//         isLoading,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// /* =========================
//    Hooks
// ========================== */

// export const useAuth = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAuth must be used inside AppProvider");
//   }
//   return context;
// };

// export const useAvatar = () => {
//   return useAuth();
// };




// import { createContext, useContext, useEffect, useState } from "react";
// import useAuthUser from "../hooks/useAuthUser";

// const AppContext = createContext(null);

// export const AppProvider = ({ children }) => {
//   const { authUser, isLoading } = useAuthUser();

//   // 🔹 global user
//   const [user, setUser] = useState(null);

//   // 🔹 global avatar
//   const [avatar, setAvatar] = useState("/avatar.png");

//   /* =========================
//      Sync React Query → Context
//   ========================== */
//   useEffect(() => {
//     if (authUser) {
//       setUser(authUser);

//       if (authUser.profilePic) {
//         setAvatar(authUser.profilePic);
//       }
//     } else {
//       setUser(null);
//       setAvatar("/avatar.png");
//     }
//   }, [authUser]);

//   /* =========================
//      Avatar Helpers
//   ========================== */
//   const changeAvatar = (fileOrUrl) => {
//     // backend URL
//     if (typeof fileOrUrl === "string") {
//       setAvatar(fileOrUrl);
//       return;
//     }

//     // file preview
//     if (fileOrUrl instanceof File) {
//       const imageURL = URL.createObjectURL(fileOrUrl);
//       setAvatar(imageURL);
//     }
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         // ✅ compatibility with old code
//         authUser: user,
//         setUser,

//         // ✅ avatar system
//         avatar,
//         setAvatar,
//         changeAvatar,

//         // ✅ loading state
//         isLoading,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// /* =========================
//    Hooks
// ========================== */

// export const useAuth = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAuth must be used inside AppProvider");
//   }
//   return context;
// };

// export const useAvatar = () => {
//   return useAuth();
// };




import { createContext, useContext, useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { authUser: queryAuthUser, isLoading } = useAuthUser();

  // 🔹 global user (like simple AuthProvider)
  const [authUser, setAuthUser] = useState(null);

  // 🔹 global avatar
  const [avatar, setAvatar] = useState("/avatar.png");

  /* =========================
     Sync React Query → Context
  ========================== */
  useEffect(() => {
    if (queryAuthUser) {
      setAuthUser(queryAuthUser);

      if (queryAuthUser.profilePic) {
        setAvatar(queryAuthUser.profilePic);
      }
    } else {
      setAuthUser(null);
      setAvatar("/avatar.png");
    }
  }, [queryAuthUser]);

  /* =========================
     Avatar Helpers
  ========================== */
  const changeAvatar = (fileOrUrl) => {
    // backend URL
    if (typeof fileOrUrl === "string") {
      setAvatar(fileOrUrl);
      return;
    }

    // file preview
    if (fileOrUrl instanceof File) {
      const imageURL = URL.createObjectURL(fileOrUrl);
      setAvatar(imageURL);
    }
  };

  /* =========================
     Set user immediately
  ========================== */
  const setUser = (user) => setAuthUser(user);

  return (
    <AppContext.Provider
      value={{
        authUser,
        setUser,

        avatar,
        setAvatar,
        changeAvatar,

        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/* =========================
   Hooks
========================== */

export const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAuth must be used inside AppProvider");
  }
  return context;
};

export const useAvatar = () => {
  return useAuth();
};
