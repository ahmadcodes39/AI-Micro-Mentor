import React from "react";
import { motion } from "framer-motion";
import {
  BookOpenCheck,
  ListChecks,
  BrainCircuit,
  BarChartBig,
} from "lucide-react";

const features = [
  {
    title: "Structured Lessons",
    description: "Follow topic-wise lessons crafted for efficient learning.",
    icon: BookOpenCheck,
  },
  {
    title: "Interactive Quizzes",
    description: "Test your understanding with instant results and feedback.",
    icon: ListChecks,
  },
  {
    title: "Smart Flashcards",
    description: "Review key points using intelligent flashcards.",
    icon: BrainCircuit,
  },
  {
    title: "Learning Dashboard",
    description: "Track your progress, scores, and learning streaks.",
    icon: BarChartBig,
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-16 px-4 md:px-8 bg-base-200 text-base-content"
    >
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Why Choose <span className="text-primary">MicroMentor</span>?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                className="bg-base-100 shadow-md rounded-xl p-6 hover:shadow-xl transition-all"
                whileHover={{ scale: 1.03 }}
              >
                <Icon className="text-primary w-8 h-8 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-base-content/70">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
