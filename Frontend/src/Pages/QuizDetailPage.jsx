import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getSingleQuiz, submitQuiz } from "../Components/API/quizApi";
import toast from "react-hot-toast";

const QuizDetailPage = () => {
  const { courseId, lessonId, quizId } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [timer, setTimer] = useState(600); 
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuiz = async () => {
      const response = await getSingleQuiz(quizId);
      if (response) {
        setQuizData(response.quiz);
        console.log(response);
      } else {
        toast.error(response.message);
      }
    };
    getQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit(true); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = async (autoSubmit = false) => {
    try {
      if (loading) return; 
      setLoading(true);

      const formattedAnswers = quizData.map((q, index) => ({
        questionId: q._id,
        selectedAnswer: userAnswers[index] || null,
      }));

      const response = await submitQuiz(
        quizId, 
        formattedAnswers,
        courseId,
        lessonId
      );

      console.log("Quiz Submitted:", response);

      toast.success(autoSubmit ? "Time's up! Quiz submitted." : "Quiz submitted successfully!");
      navigate(`/quiz/${courseId}/${lessonId}`);
    } catch (error) {
      console.error("Submit error:", error.message);
      toast.error("Failed to submit quiz.");
    } finally {
      setLoading(false);
    }
  };

  if (!quizData || quizData.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-primary">
          {quizData[0]?.title}
        </h1>
        <p className="text-lg font-semibold text-gray-400 mt-2">
          ⏳ Time Left:{" "}
          <span className="font-semibold">{formatTime(timer)}</span>
        </p>
      </div>

      <div className="space-y-6">
        {quizData.map((q, index) => (
          <div
            key={q._id}
            className="card bg-base-100 shadow-xl p-5 border border-gray-200"
          >
            <h3 className="text-lg font-semibold mb-3">
              {index + 1}. {q.question}
            </h3>
            <div className="grid gap-2">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    className="radio radio-primary"
                    checked={userAnswers[index] === opt}
                    onChange={() =>
                      setUserAnswers((prev) => ({
                        ...prev,
                        [index]: opt,
                      }))
                    }
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center flex justify-end">
        <button
          className="btn btn-primary px-8"
          onClick={() => handleSubmit(false)}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner text-white"></span>
          ) : (
            "Submit Quiz"
          )}
        </button>
      </div>
    </div>
  );
};

export default QuizDetailPage;
