import {
  Home,
  GraduationCapIcon,
  Settings,
  LogOut,
  Aperture,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/authContext";

const MobileNav = ({ handleLogout }) => {
  const { currentUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLogoutUser = async () => {
    await handleLogout();
  };

  const navigations = [
    { name: "Home", link: "/dashboard", icon: <Home size={20} /> },
    {
      name: "Courses",
      link: "/my-courses",
      icon: <GraduationCapIcon size={20} />,
    },
    { name: "Settings", link: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-200 shadow-t px-2 py-6 flex justify-around items-center md:hidden z-50">
      {/* App Name */}
      <div className="text-lg aladin-regular text-primary">MicroMentor</div>

      {/* Navigation Icons */}
      {navigations.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.link}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-primary" : "text-gray-400"
            }`
          }
        >
          {item.icon}
          <span>{item.name}</span>
        </NavLink>
      ))}

      {/* Profile + Logout */}
      <div className="relative">
        <div
          className="cursor-pointer"
          onClick={() => setShowLogout(!showLogout)}
        >
          {imageError ? (
            <Aperture className="text-primary size-8" />
          ) : (
            <img
              src={currentUser?.avatar}
              alt="avatar"
              className="size-8 rounded-full"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {showLogout && (
          <button
            onClick={handleLogoutUser}
            className="absolute bottom-10 right-0 bg-base-100 p-2 rounded shadow text-sm flex items-center gap-2 text-error"
          >
            <LogOut size={16} />
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
