import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rocket, Info } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="relative py-20 px-4 md:px-8 text-white overflow-hidden">
      {/* Light Overlay Glow */}
      <motion.div
        className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white,transparent)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      />

      <motion.div
        className="max-w-4xl mx-auto relative z-10  text-base-content rounded-3xl shadow-2xl  p-10 md:p-14 text-center"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Optional Badge */}
        <div className="inline-block bg-primary/10 text-primary font-medium text-sm px-4 py-1 rounded-full mb-4">
          🚀 Start for Free – No Credit Card Needed
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
          Unlock Smarter Learning with{" "}
          <span className="text-primary">MicroMentor</span>
        </h2>

        {/* Description */}
        <p className="text-base-content/70 mb-8 text-lg">
          Get access to interactive lessons, quizzes, flashcards, and detailed progress tracking. Trusted by thousands of learners.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <Link
            to="/register"
            className="btn btn-primary btn-lg gap-2 hover:scale-105 transition-all"
          >
            <Rocket className="w-5 h-5" />
            Get Started
          </Link>
          <a
            href="#how-it-works"
            className="btn btn-outline btn-lg gap-2 hover:scale-105 transition-all"
          >
            <Info className="w-5 h-5" />
            Learn How It Works
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-base-content/70 mt-6">
          <div>
            <p className="text-xl font-bold text-primary">10,000+</p>
            <p>Learners Enrolled</p>
          </div>
          <div>
            <p className="text-xl font-bold text-primary">120+</p>
            <p>Topic-Based Lessons</p>
          </div>
          <div>
            <p className="text-xl font-bold text-primary">95%</p>
            <p>Student Satisfaction</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
