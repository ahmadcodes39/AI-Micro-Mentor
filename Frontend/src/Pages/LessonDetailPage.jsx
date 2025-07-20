import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { getIndividualLesson } from "../Components/API/lessonApi";
import IndividualLessonHeader from "../Components/LessonComponent/IndividualLessonHeader";
import { customsReadingTime } from "../Components/utility/calculateTime";
import IndividualLessonDetails from "../Components/LessonComponent/IndividualLessonDetails";


const LessonDetailPage = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const getLesson = async () => {
      try {
        const response = await getIndividualLesson({ courseId, lessonId });
        setLesson(response.lesson); 
        toast.success(response.message);
      } catch (error) {
        toast.error("Failed to load lesson",error);
      }
    };

    getLesson();
  }, [courseId, lessonId]);

  
  if (!lesson) {
    return (
      <div className="flex justify-center items-center h-32">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  const readingTime = customsReadingTime(lesson?.content)

  return (
    <div>
      <IndividualLessonHeader
        title={lesson.title}
        courseName={lesson.course?.name}
        duration={readingTime}
        tags={lesson?.tags || lesson.title.toLowerCase()}
        createdAt={lesson.createdAt}
        
      />
      <IndividualLessonDetails content={lesson?.content}/>
    </div>
  );
};

export default LessonDetailPage;
