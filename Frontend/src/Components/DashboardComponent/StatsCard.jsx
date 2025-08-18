import React from "react";
import { motion } from "framer-motion";
import { Book, BookOpenCheck, CheckCircle, Clipboard, Layers3 } from "lucide-react";

const statsConfig = [
  {
    title: "Total Courses",
    key: "totalCourses",
    icon: <BookOpenCheck size={24}/>,
    bg: "bg-[rgba(59,130,246,0.1)]", 
    iconColor: "text-blue-500",
  },
  // {
  //   title: "Lessons Completed",
  //   key: "lessonCompleted",
  //   icon: <Clipboard size={24} />,
  //   bg: "bg-[rgba(250,204,21,0.1)]", 
  //   iconColor: "text-yellow-500",
  // },
  {
    title: "Quizzes Attempted",
    key: "quizAttempted",
    icon: <CheckCircle size={24} />,
    bg: "bg-[rgba(34,197,94,0.1)]",
    iconColor: "text-green-500",
  },
  {
    title: "Total FlashCards",
    key: "totalFlashCards",
    icon: <Layers3 size={24} />,
    bg: "bg-[rgba(168,85,247,0.1)]", 
    iconColor: "text-purple-500",
  },
];

const StatsCard = ({ cardStats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {statsConfig.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className={`relative p-6 rounded-xl shadow-md border border-base-300 ${item.bg} backdrop-blur-md`}
        >
          <h3 className="text-md font-semibold text-base-content">{item.title}</h3>
          <p className="text-3xl font-bold text-primary mt-2">{cardStats[item.key] ?? 0}</p>
          <div className={`absolute top-2 right-2 ${item.iconColor}`}>{item.icon}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCard;
