import React from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router";
import NoCoursesFound from "./NoCourseFound";

const CourseCards = ({ courses = [], loading }) => {
  const navigate = useNavigate();

  const handleViewCourse = (id,slug) => {
    navigate(`/course/${id}/${slug}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (courses.length === 0) {
    return <NoCoursesFound />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {courses.map((course) => (
        <div
          key={course._id}
          className="card relative bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300 border border-base-300"
        >
          <div className="absolute right-3 top-3">
            <div className="badge badge-primary text-xs">{course.category}</div>
          </div>

          <div className="card-body">
            <h2 className="card-title text-white">{course.name}</h2>
            <p className="text-sm text-gray-400">
              {course.description?.slice(0, 100)}...
            </p>

            <div className="text-xs text-gray-500 mt-2">
              {course.totalLessons || course.lessons?.length || 0} lessons • {course.progress}% completed
            </div>

            <progress
              className="progress progress-primary mt-2"
              value={course.progress}
              max="100"
            ></progress>

            <div className="card-actions justify-end mt-4">
              <button
                className="btn btn-sm btn-outline btn-primary"
                onClick={() => handleViewCourse(course._id, course.slug)}
              >
                <Eye className="w-4 h-4" /> View
              </button>
              <button className="btn btn-sm btn-outline btn-warning">
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button className="btn btn-sm btn-outline btn-error">
                <Trash className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCards;
