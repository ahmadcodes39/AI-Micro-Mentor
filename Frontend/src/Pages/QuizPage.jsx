import React from "react";
import LessonTopBar from "../Components/LessonTopBar";
import { useState } from "react";
import { useEffect } from "react";
import QuizDialog from "../Components/Modal/QuizDialog";
import {
  generateQuiz,
  getAllQuizes,
  getSpecificQuiz,
} from "../Components/API/quizApi";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import QuizCard from "../Components/QuizComponents/QuizCard";

const QuizPage = () => {
  const [lessonContent, setLessonContent] = useState("");
  const { courseId, lessonId } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalQuizes, setTotalQuizes] = useState(0);
  const handleLessonContent = (lesson) => {
    setLessonContent(lesson);
  };
  useEffect(() => {
    // console.log("lesson content for quiz", lessonContent);
  }, [lessonContent]);

  const getQuizData = async () => {
      try {
        setLoading(true);
        const response = await getSpecificQuiz(courseId, lessonId);
        // console.log("response data ", response);
        setQuizData(response?.quiz);
        if (response?.quiz) {
          setQuizData(response.quiz);
          setTotalQuizes(response.totalQuizzes);
        } else {
          toast.error(response.message || "Error in fetching user quizzes");
        }
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
  
    getQuizData();
  }, []);

  const handleOpenModel = () => {
    document.getElementById("quiz_modal").showModal();
  };

  const handleGenerateQuiz = async (topic) => {
  try {
    const response = await generateQuiz(courseId, lessonId, topic);
    if (response) {
      setQuizData((prev) => [...prev, response.quiz]);
      setTotalQuizes((prev) => prev + 1);
      document.getElementById("quiz_modal").close();
    } else {
      toast.error(response.message || "Failed to generate quiz");
    }
  } catch (err) {
    console.error("Quiz generation failed:", err);
    toast.error("Something went wrong!");
  }
};
  console.log("quiz data", quizData);
  return (
    <div>
      <LessonTopBar onLessonLoaded={handleLessonContent} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="font-medium text-white text-xl">
            Total Quizes: <span className="text-accent">{totalQuizes}</span>
          </p>

          <div className="flex justify-end items-center mb-4 mt-4">
            <button
              onClick={() => handleOpenModel(lessonContent?.title)}
              className="btn btn-sm btn-outline btn-accent mr-4"
            >
              ✨ Generate Quiz
            </button>
          </div>
        </div>

        {quizData.length === 0 ? (
          <p className="text-sm text-center text-gray-400 mt-4">
            No quiz generated yet.
          </p>
        ) : (
          <>
            {loading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quizData.map((item) => (
                  <QuizCard key={item?._id} quiz={item} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <QuizDialog
        content={lessonContent?.title}
        generateQuiz={handleGenerateQuiz}
        getQuizData={getQuizData}
      />
    </div>
  );
};

export default QuizPage;
