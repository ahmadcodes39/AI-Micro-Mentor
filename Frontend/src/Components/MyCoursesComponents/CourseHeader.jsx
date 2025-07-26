import { Plus } from "lucide-react";
import React, { useState } from "react";
import CourseDialog from "../Modal/CourseDialog"

const CourseHeader = ({refreshCourses , setSearchQuery,searchQuery}) => {
  

  const openDialog = () => {
    document.getElementById("my_modal_1").showModal();
  };

  return (
    <>
      <div className="sticky top-0 z-10 bg-base-100 px-4 py-3 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="font-semibold text-white text-2xl md:text-3xl">
            My Courses
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <label className="input input-bordered flex items-center gap-2 w-full sm:w-80 bg-base-300">
              <input
                type="text"
                className="grow bg-base-300 text-white placeholder:text-gray-400"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>

            <button
              className="btn btn-primary text-white w-full sm:w-auto"
              onClick={openDialog}
            >
              <Plus className="mr-1 md:flex hidden" />
              Add New Course
            </button>
          </div>
        </div>
      </div>

      <CourseDialog refreshCourses={refreshCourses}/>
    </>
  );
};

export default CourseHeader;
