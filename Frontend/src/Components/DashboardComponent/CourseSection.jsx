import { GraduationCap, Eye } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const CourseSection = ({ extractedData }) => {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/course/${id}`);
  };

  return (
    <div className="flex flex-col gap-4 mt-4 mb-2">
      <h1 className="text-2xl text-primary font-bold flex items-center gap-2">
        <GraduationCap /> Courses
      </h1>

      <div className="overflow-x-auto rounded-xl border border-base-300 ">
        <table className="table table-zebra text-sm table-lg w-full ">
          <thead className="bg-base-200 text-base font-semibold">
            <tr className="text-center">
              <th>Name</th>
              <th>Category</th>
              <th>Lessons</th>
              <th>Completed</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {extractedData?.length > 0 ? (
              extractedData.map((course, index) => (
                <tr key={index} className="text-center">
                  <td>{course.name}</td>
                  <td>
                    <div className="badge badge-info text-gray-700">
                      {course.category}
                    </div>
                  </td>
                  <td>{course.totalLessons}</td>
                  <td>{course.completedLessons}</td>
                  <td>
                    <progress
                      className="progress progress-success w-28"
                      value={course.progress}
                      max="100"
                    ></progress>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary btn-outline flex items-center gap-1"
                      onClick={() => handleNavigate(course.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseSection;
