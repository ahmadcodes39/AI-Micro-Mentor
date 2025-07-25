import React, { useEffect, useState } from "react";
import CourseHeader from "../Components/MyCoursesComponents/CourseHeader";
import CourseCards from "../Components/MyCoursesComponents/CourseCards";
import { getAllCourses } from "../Components/API/coursesApi";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true); 
      const response = await getAllCourses();

      if (response?.courses) {
        setCourses(response.courses);
        console.log(response);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false); 
    }
  };
  console.log("course data",courses)

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <CourseHeader refreshCourses={fetchCourses} />
      <CourseCards courses={courses} loading={loading} />
    </div>
  );
};

export default MyCourses;
