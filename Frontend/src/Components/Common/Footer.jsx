import React from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & Description */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-primary aladin-regular">MicroMentor</h1>
          <p className="text-sm text-base-content/70">
            Your AI-powered interactive learning platform for lessons, quizzes, and flashcards.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-1">Quick Links</h3>
          <a href="#features" className="hover:text-primary text-sm">Features</a>
          <a href="#how-it-works" className="hover:text-primary text-sm">How It Works</a>
          <a href="#contact" className="hover:text-primary text-sm">Contact</a>
          <Link to="/register" className="hover:text-primary text-sm">Get Started</Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-1">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://github.com/ahmadcodes39" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/syed-ahmad-ali-3461012a9/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      {/* Divider + Bottom Note */}
      <div className="divider my-6" />

      <div className="text-center text-sm text-base-content/70">
        &copy; {new Date().getFullYear()} MicroMentor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
