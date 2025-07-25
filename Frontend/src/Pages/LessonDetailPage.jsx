import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { deleteLesson, getIndividualLesson, updateLesson } from "../Components/API/lessonApi";
import IndividualLessonHeader from "../Components/LessonComponent/IndividualLessonHeader";
import { customsReadingTime } from "../Components/utility/calculateTime";
import IndividualLessonDetails from "../Components/LessonComponent/IndividualLessonDetails";

const LessonDetailPage = () => {
  const [lesson, setLesson] = useState(null);
  const { courseId, lessonId } = useParams();
  const [isDelete,setIsDelete] = useState(false)
  const navigate = useNavigate()
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    const getLesson = async () => {
      try {
        const response = await getIndividualLesson({ courseId, lessonId });
        setLesson(response.lesson);

        const complete = Boolean(response?.lesson?.completionDate);
        setIsComplete(complete);
      } catch (error) {
        toast.error("Failed to load lesson", error);
      }
    };

    getLesson();
  }, [courseId, lessonId]);

  const handleDoneLesson = async () => {
    try {
      const response = await updateLesson(courseId, lessonId);
      if (response) {
        const complete = Boolean(response?.lesson?.completionDate);
        setIsComplete(complete);
        toast.success("Lesson marked as completed!");
      }
    } catch (err) {
      toast.error("Failed to mark as done.", err);
    }
  };
  const handleDeleteLesson = async()=>{
    setIsDelete(true)
    const response = await deleteLesson(courseId,lessonId)
    if (response) {
      toast.success(response.message)
      navigate(`/course/${courseId}`)
      setIsDelete(false)
    }
    else{
      toast.error(response.message)
    }
  }

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
      <IndividualLessonDetails
        content={lesson?.content}
        handleDoneLesson={handleDoneLesson}
        isComplete={isComplete}
        handleDeleteLesson = {handleDeleteLesson}
        isDelete={isDelete}
      />
    </div>
  );
};

export default LessonDetailPage;
