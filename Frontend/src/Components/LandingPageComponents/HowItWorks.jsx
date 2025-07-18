import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  NotebookPen,
  ClipboardList,
  LineChart,
} from "lucide-react";

const steps = [
  {
    title: "Sign Up",
    description: "Create your free account to start your learning journey.",
    icon: UserPlus,
  },
  {
    title: "Learn Lessons",
    description: "Go through structured lessons designed for effective learning.",
    icon: NotebookPen,
  },
  {
    title: "Take Quizzes",
    description: "Test yourself with topic-wise quizzes and instant results.",
    icon: ClipboardList,
  },
  {
    title: "Review & Track",
    description: "Use flashcards and track your learning progress in the dashboard.",
    icon: LineChart,
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-16 px-4 md:px-8 bg-base-100 text-base-content"
    >
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It <span className="text-primary">Works</span>
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Steps List */}
          <div className="flex-1 space-y-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  className="flex items-start gap-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="bg-base-200 p-3 rounded-full shadow-md">
                    <Icon className="text-primary w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      {`${idx + 1}. ${step.title}`}
                    </h3>
                    <p className="text-sm text-base-content/70">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Placeholder Image */}
          <motion.div
            className="flex-1 max-w-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img
              src="1.webp"
              alt="How MicroMentor Works"
              className="rounded-xl shadow-xl w-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
