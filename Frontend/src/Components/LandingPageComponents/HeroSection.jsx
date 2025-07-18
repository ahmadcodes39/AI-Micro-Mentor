import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="about"
      className="min-h-[80vh] flex items-center justify-center text-center px-4 md:px-8"
    >
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-6">
          Learn Smarter, Not Harder <br />
          with <span className="text-primary">MicroMentor</span>
        </h1>

        <p className="text-base-content/70 text-lg mb-8">
          Structured lessons, topic-wise quizzes, flashcards and performance tracking — all in one place.
        </p>

        <Link to="/register" className="btn btn-primary btn-lg">
          <Rocket className="mr-2" />
          Get Started
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
