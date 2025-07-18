import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaInfoCircle,
  FaListAlt,
  FaPlayCircle,
  FaEnvelope,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <motion.nav
      className="w-full bg-base-100 shadow-md px-6 py-4 flex justify-between items-center z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <Link to="/" className="text-3xl text-primary aladin-regular">
        MicroMentor
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 items-center text-sm">
        <a href="#about" className="text-md text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:font-semibold ">
          About
        </a>

        <a href="#features" className="text-md text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:font-semibold ">
          Features
        </a>

        <a href="#how-it-works" className="text-md text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:font-semibold ">
          How It Works
        </a>

        <a href="#contact" className="text-md text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:font-semibold ">
          Contact
        </a>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-3">
        <Link to="/login" className="btn btn-ghost btn-sm">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary btn-sm">
          Get Started
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
