



// import { Link, useLocation } from "react-router";
// import { BellIcon, LogOutIcon, MessageCircle } from "lucide-react";
// import { useAuth } from "../context/AppContext";
// import useLogout from "../hooks/useLogout";

// const Navbar = () => {
//   const { authUser } = useAuth(); // 🔥 global source of truth
//   const { logoutMutation } = useLogout();
//   const location = useLocation();
//   const isChatPage = location.pathname?.startsWith("/chat");

//   const handleAvatarClick = () => {
//     document.getElementById("avatarInput")?.click();
//   };

//   return (
//     <nav className="sticky top-0 z-30 h-16 bg-base-200/90 backdrop-blur border-b border-base-300 shadow-sm">
//       <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 bg-blue-200">
//         <div className="flex h-full items-center justify-between">

//           {/* LOGO (Chat page only) */}
//           {isChatPage ? (
//             <Link to="/" className="flex items-center gap-3">
//               <MessageCircle className="size-9 text-primary" />
//               <span className="text-2xl font-semibold tracking-wide">Nexa</span>
//             </Link>
//           ) : (
//             <div />
//           )}

//           {/* RIGHT SECTION */}
//           <div className="flex items-center gap-3 sm:gap-4">

//             {/* Notifications */}
//             <Link to="/notifications">
//               <button className="btn btn-ghost btn-circle hover:bg-base-300 transition">
//                 <BellIcon className="h-5 w-5 opacity-80" />
//               </button>
//             </Link>

//             {/* PROFILE AVATAR */}
//             <div
//               className="avatar cursor-pointer"
//               onClick={handleAvatarClick}
//               title="Change profile picture"
//             >
//               <div className="w-9 h-9 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2 overflow-hidden flex items-center justify-center bg-base-300">
//                 <img
//                   key={authUser?.profilePic} // forces re-render if pic changes
//                   src={
//                     authUser?.profilePic
//                       ? `http://localhost:5001${authUser.profilePic}`
//                       : "/default-avatar.png"
//                   }
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>

//             {/* Hidden file input */}
//             <input
//               id="avatarInput"
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={() => {}}
//               // NOTE: Navbar does NOT handle avatar upload directly.
//               // Use Onboarding page for actual upload.
//             />

//             {/* Logout */}
//             <button
//               onClick={logoutMutation}
//               className="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition"
//               title="Logout"
//             >
//               <LogOutIcon className="h-5 w-5" />
//             </button>

//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import { Link, useLocation } from "react-router";
// import { BellIcon, LogOutIcon, MessageCircle } from "lucide-react";
// import { useAuth } from "../context/AppContext";
// import useLogout from "../hooks/useLogout";
// import { useQuery } from "@tanstack/react-query";
// import { getFriendRequests } from "../lib/api";

// const Navbar = () => {
//   const { authUser } = useAuth(); // 🔥 global source of truth
//   const { logoutMutation } = useLogout();
//   const location = useLocation();
//   const isChatPage = location.pathname?.startsWith("/chat");

//   const handleAvatarClick = () => {
//     document.getElementById("avatarInput")?.click();
//   };

//   // ✅ Fetch friend requests for live notification badge
//   const { data: friendRequests } = useQuery({
//     queryKey: ["friendRequests"],
//     queryFn: getFriendRequests,
//     // Refetch every 10 seconds to keep badge live
//     refetchInterval: 10000,
//   });

//   const incomingRequests = friendRequests?.incomingReqs || [];
//   const totalNotifications = incomingRequests.length;

//   return (
//     <nav className="sticky top-0 z-30 h-16 bg-base-200/90 backdrop-blur border-b border-base-300 shadow-sm">
//       <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 bg-blue-200">
//         <div className="flex h-full items-center justify-between">

//           {/* LOGO (Chat page only) */}
//           {isChatPage ? (
//             <Link to="/" className="flex items-center gap-3">
//               <MessageCircle className="size-9 text-primary" />
//               <span className="text-2xl font-semibold tracking-wide">Nexa</span>
//             </Link>
//           ) : (
//             <div />
//           )}

//           {/* RIGHT SECTION */}
//           <div className="flex items-center gap-3 sm:gap-4">

//             {/* Notifications */}
//             <Link to="/notifications" className="relative">
//               <button className="btn btn-ghost btn-circle hover:bg-base-300 transition">
//                 <BellIcon className="h-5 w-5 opacity-80" />
//               </button>

//               {/* 🔴 Live notification badge */}
//               {totalNotifications > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                   {totalNotifications}
//                 </span>
//               )}
//             </Link>

//             {/* PROFILE AVATAR */}
//             <div
//               className="avatar cursor-pointer"
//               onClick={handleAvatarClick}
//               title="Change profile picture"
//             >
//               <div className="w-9 h-9 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2 overflow-hidden flex items-center justify-center bg-base-300">
//                 <img
//                   key={authUser?.profilePic} // forces re-render if pic changes
//                   src={
//                     authUser?.profilePic
//                       ? `http://localhost:5001${authUser.profilePic}`
//                       : "/default-avatar.png"
//                   }
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>

//             {/* Hidden file input */}
//             <input
//               id="avatarInput"
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={() => {}}
//             />

//             {/* Logout */}
//             <button
//               onClick={logoutMutation}
//               className="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition"
//               title="Logout"
//             >
//               <LogOutIcon className="h-5 w-5" />
//             </button>

//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link, useLocation } from "react-router";
import { BellIcon, LogOutIcon, MessageCircle } from "lucide-react";
import { useAuth } from "../context/AppContext";
import useLogout from "../hooks/useLogout";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

const Navbar = () => {
  const { authUser } = useAuth(); // 🔥 global source of truth
  const { logoutMutation } = useLogout();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  // ✅ Fetch friend requests for live notification badge
  const { data: friendRequests } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
    refetchInterval: 10000, // refresh every 10s
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const totalNotifications = incomingRequests.length;

  return (
    <nav className="sticky top-0 z-30 h-16 bg-base-200/90 backdrop-blur border-b border-base-300 shadow-sm">
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 bg-blue-200">
        <div className="flex h-full items-center justify-between">

          {/* LOGO (Chat page only) */}
          {isChatPage ? (
            <Link to="/" className="flex items-center gap-3">
              <MessageCircle className="size-9 text-primary" />
              <span className="text-2xl font-semibold tracking-wide">Nexa</span>
            </Link>
          ) : (
            <div />
          )}

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Notifications */}
            <Link to="/notifications" className="relative">
              <button className="btn btn-ghost btn-circle hover:bg-base-300 transition">
                <BellIcon className="h-5 w-5 opacity-80" />
              </button>

              {/* 🔴 Live notification badge */}
              {totalNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalNotifications}
                </span>
              )}
            </Link>

            {/* PROFILE AVATAR (no change feature) */}
            <div
              className="avatar cursor-pointer"
              title="Profile"
            >
              <div className="w-9 h-9 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2 overflow-hidden flex items-center justify-center bg-base-300">
                <img
                  key={authUser?.profilePic} // forces re-render if pic changes
                  src={
                    authUser?.profilePic
                      ? `http://localhost:5001${authUser.profilePic}`
                      : "/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logoutMutation}
              className="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition"
              title="Logout"
            >
              <LogOutIcon className="h-5 w-5" />
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
