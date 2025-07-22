import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { getIndividualLesson } from "../Components/API/lessonApi";
import IndividualLessonHeader from "../Components/LessonComponent/IndividualLessonHeader";
import { customsReadingTime } from "../Components/utility/calculateTime";

const LessonTopBar = ({ onLessonLoaded }) => {
  const [lesson, setLesson] = useState(null);
  const { courseId, lessonId } = useParams();

  useEffect(() => {
    const getLesson = async () => {
      try {
        const response = await getIndividualLesson({ courseId, lessonId });
        setLesson(response.lesson); 
        if (onLessonLoaded) onLessonLoaded(response.lesson); //  Pass to parent
      } catch (error) {
        toast.error("Failed to load lesson"+error);
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

  const readingTime = customsReadingTime(lesson?.content);

  return (
    <div>
      <IndividualLessonHeader
        title={lesson.title}
        courseName={lesson.course?.name}
        duration={readingTime}
        tags={lesson?.tags || lesson.title.toLowerCase()}
        createdAt={lesson.createdAt}
        content={lesson?.content}
      />
    </div>
  );
};


export default LessonTopBar;
