import React from "react";
import { useNavigate } from "react-router";

const LessonCards = ({ lesson }) => {
  const stripMarkdown = (text) => {
    return text
      .replace(/[#_*~`>]/g, "")
      .replace(/\n+/g, " ")
      .trim();
  };
  const navigate = useNavigate();
  const handleLessonView = () => {
    navigate(`/lesson/${lesson.course._id}/${lesson._id}`);
  };

  return (
    <div className="card bg-base-200 text-white shadow-md">
      <div className="card-body">
        <h3 className="card-title text-lg">{lesson.title.slice(0, 30)}...</h3>
        <p className="text-gray-300 text-sm">
          {stripMarkdown(lesson.content).slice(0, 100)}...
        </p>
        <div className="mt-2 flex justify-between items-center text-sm text-gray-400">
          <span className="badge badge-outline badge-primary">
            {lesson.duration} min
          </span>
        </div>
        <button
          className="btn btn-sm btn-primary mt-3"
          onClick={handleLessonView}
        >
          View Lesson
        </button>
      </div>
    </div>
  );
};

export default LessonCards;
