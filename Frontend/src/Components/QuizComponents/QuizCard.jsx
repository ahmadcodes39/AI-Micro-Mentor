import React from "react";
import { useNavigate, useParams } from "react-router";

const QuizCard = ({ quiz }) => {
  const {courseId,lessonId} = useParams()
  const totalQuestions = quiz?.questions?.length || 0;
  const optionsPerQuestion =
    quiz?.questions?.[0]?.options?.length || "N/A";
  const score = quiz?.quizScore ?? 0;
  const completed = quiz?.completed ?? false;
  const navigate = useNavigate()

  const handleQuiz = ()=>{
    navigate(`/test/${courseId}/${lessonId}/${quiz?.quizSessionId}`)
  }

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition duration-300 ease-in-out relative">
      <div className="card-body space-y-4">
        <h2 className="card-title text-lg sm:text-xl text-primary relative">
          {quiz?.title || "No title"}
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
          <div className="flex flex-col items-start">
            <span className="text-base-content/70">Total Questions</span>
            <span className="font-bold">{totalQuestions}</span>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-base-content/70">Options per Question</span>
            <span className="font-bold">{optionsPerQuestion} (MCQs)</span>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-base-content/70">Time Limit</span>
            <span className="font-bold">10 Minutes</span>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-base-content/70">Score</span>
            <span
              className={`font-bold ${
                score >= totalQuestions / 2 ? "text-success" : "text-error"
              }`}
            >
              {score}/{totalQuestions}
            </span>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-base-content/70">Status</span>
            <span
              className={`font-bold ${
                completed ? "text-success" : "text-warning"
              }`}
            >
              {completed ? "Completed" : "Not Attempted"}
            </span>
          </div>
        </div>

        <div className="card-actions absolute bottom-4 right-2">
          <button className="btn btn-primary btn-sm"onClick={handleQuiz}>{completed?"View Details":"Take Quiz"}</button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
