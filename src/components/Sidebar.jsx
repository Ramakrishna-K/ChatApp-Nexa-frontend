


import { Link, useLocation } from "react-router";
import { BellIcon, HomeIcon, UsersIcon, MessageCircle } from "lucide-react";
import { useAuth } from "../context/AppContext";

const Sidebar = () => {
  const { authUser } = useAuth(); // 🔥 global source of truth
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">

      {/* LOGO */}
      <div className="p-3.5 border-b border-base-300 bg-blue-300">
        <Link to="/" className="flex items-center gap-3">
          <MessageCircle className="size-9 text-primary" />
          <span className="text-2xl font-semibold tracking-wide">Nexa</span>
        </Link>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 p-4 space-y-1 bg-blue-200">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 opacity-70" />
          Home
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 opacity-70" />
          Friends
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 opacity-70" />
          Notifications
        </Link>
      </nav>

      {/* USER PROFILE */}
      <div className="p-4 border-t border-base-300 mt-auto bg-blue-300">
        <div className="flex items-center gap-3">

          {/* AVATAR — now synced globally */}
          <div className="avatar">
            <div className="w-9 h-9 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2 overflow-hidden flex items-center justify-center bg-base-300">
              <img
                key={authUser?.profilePic} // 🔥 forces re-render on profile change
                src={
                  authUser?.profilePic
                    ? `http://localhost:5001${authUser.profilePic}`
                    : "/default-avatar.png"
                }
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <p className="font-semibold text-sm truncate">
              {authUser?.fullName || "User"}
            </p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
