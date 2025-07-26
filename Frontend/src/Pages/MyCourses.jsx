import React, { useEffect, useState } from "react";
import CourseHeader from "../Components/MyCoursesComponents/CourseHeader";
import CourseCards from "../Components/MyCoursesComponents/CourseCards";
import { deleteCourse, getAllCourses } from "../Components/API/coursesApi";
import toast from "react-hot-toast";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await getAllCourses();
      setCourses(response?.courses || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    const response = await deleteCourse({ id });
    if (response) {
      toast.success(response.message);
    }
    fetchCourses();
  };

  // Filter courses based on searchQuery
  const filteredCourses = courses.filter((course) =>
    course?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <CourseHeader
        refreshCourses={fetchCourses}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <CourseCards
        courses={filteredCourses}
        loading={loading}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyCourses;
