import {
  BookAIcon,
  CardSimIcon,
  GraduationCapIcon,
  Home,
  PanelRightOpen,
  LogOut,
  PanelRightClose,
  Aperture,
  SquareCheck,
  Settings,
  BookOpenCheck,
  ListChecks,
  BrainCircuit,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../API/authApi";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import MobileNav from "./MobileNav";

const SideBar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isClose, setIsClose] = useState(true);
  const [imageError, setImageError] = useState(false);
  const navigations = [
    { name: "Home", link: "/dashboard", icon: <Home size={20} /> },
    {
      name: "My Courses",
      link: "/my-courses",
      icon: <GraduationCapIcon size={20} />,
    },

    { name: "Settings", link: "/settings", icon: <Settings size={20} /> },
  ];

  const handleToggle = () => {
    setIsClose((prev) => !prev);
  };

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response?.message) {
      toast.success(response.message);
      setCurrentUser(null);
    } else {
      toast.error(response.message || "Logout failed");
    }
  };

  return (
    // desktop sidebar
    <>
      <div
        className={`${
          isClose ? "w-20" : "w-64"
        }  bg-base-200 h-screen overflow-hidden hidden md:flex flex-col justify-between p-4 transition-all duration-300 ease-in-out shadow-md`}
      >
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className={`flex items-center ml-2 ${isClose ? "" : "gap-2"}`}>
              {imageError ? (
                <Aperture className={`text-primary`} />
              ) : (
                <img
                  src={currentUser?.avatar}
                  className="rounded-full size-8"
                  alt="user avatar"
                  onError={() => setImageError(true)}
                />
              )}
              {!isClose && (
                <span className="text-white font-semibold text-lg">
                  Micro Mentor
                </span>
              )}
            </div>
            <button onClick={handleToggle}>
              {isClose ? (
                <PanelRightOpen className="text-gray-400 size-5 mr-[-15px]" />
              ) : (
                <PanelRightClose className="text-gray-400 size-5" />
              )}
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navigations.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-base rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-300 hover:bg-base-300"
                  }`
                }
              >
                {item.icon}
                {!isClose && (
                  <span className="font-medium text-lg">{item.name}</span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-outline btn-error flex items-center justify-start gap-3"
        >
          <LogOut size={20} />
          {!isClose && <span className="font-medium">Logout</span>}
        </button>
      </div>
      {/* // mobil nav - */}
      <MobileNav handleLogout={handleLogout}/>
    </>
  );
};

export default SideBar;
