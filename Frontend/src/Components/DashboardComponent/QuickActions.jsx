import React from "react";
import { useNavigate } from "react-router";

const QuickActions = ({ courseData }) => {
  const navigate = useNavigate();
  
  const hhandleNavigate = (id) => {
    navigate(`/course/${id}`);
  };
  return (
    <div className="card bg-base-200 text-white shadow-xl max-w-3xl w-full mx-auto">
      <div className="card-body space-y-4">
        <h2 className="text-2xl font-bold text-primary">
          📚 Continue Learning
        </h2>

        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{courseData.name || ""}</h3>
          <div className="badge badge-accent badge-outline">
            {courseData.category || "Uncategorized"}
          </div>
        </div>
        <p className="text-gray-400 text-sm">{courseData.description || ""}</p>

        <div className="flex items-center gap-2">
          <progress
            className="progress progress-info w-full"
            value={courseData.progress || 0}
            max="100"
          ></progress>
          <span className="text-sm font-medium text-gray-300">
            {courseData.progress || 0}%
          </span>
        </div>

        <div className="card-actions justify-end">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => hhandleNavigate(courseData._id)}
          >
            Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
