import React from "react";
import { BookOpen } from "lucide-react";

const LessonStats = ({ description, totalLessons }) => {
  return (
    <div className="bg-base-200 rounded-xl p-5 shadow-md border border-base-300 mt-4">
      <div className="flex items-center gap-4 mb-3">
        <div className="p-3 bg-primary text-white rounded-full">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xl font-semibold text-base-content">
            Total Lessons
          </p>
          <p className="text-3xl font-bold text-primary">{totalLessons}</p>
        </div>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default LessonStats;
