import React, { useEffect } from "react";
import LessonHeader from "../Components/MyCoursesComponents/LessonHeader";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { getIndividualLesson } from "../Components/API/lessonApi";
import IndividualLessonHeader from "../Components/LessonComponent/IndividualLessonHeader";

const LessonDetailPage = () => {
  const { courseId, LessonId } = useParams();
  useEffect(() => {
    const getLesson = async () => {
      const response = await getIndividualLesson({ courseId, LessonId });
      console.log("Individual lesson data ", response);
      toast.success(response.message);
    };

    getLesson();
  }, []);
  return (
    <div>
      <IndividualLessonHeader />
    </div>
  );
};

export default LessonDetailPage;
