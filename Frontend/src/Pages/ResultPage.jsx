import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { jsPDF } from "jspdf";

const ResultPage = () => {
  const location = useLocation();
  const [resultData, setResultData] = useState(null);
  const navigate = useNavigate()
  const {courseId,lessonId} = useParams()
  useEffect(() => {
    if (location.state) {
      setResultData(location.state);
    }
  }, [location]);

  const getPerformanceFeedback = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return "🏆 Perfect Score! You're a JavaScript Master!";
    if (percentage >= 80) return "🎉 Great job! You really know your stuff.";
    if (percentage >= 50) return "👍 Decent effort! Review the incorrect answers and try again.";
    return "🧠 Keep practicing! You're on the path to mastering JavaScript.";
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = 20;

    // Title
    doc.setFontSize(18);
    doc.text("Quiz Results", margin, yPosition);
    yPosition += 10;

    // Score
    doc.setFontSize(12);
    doc.text(`Score: ${resultData.score} out of ${resultData.totalQuestions}`, margin, yPosition);
    yPosition += 10;

    // Performance Feedback
    const feedback = getPerformanceFeedback(resultData.score, resultData.totalQuestions);
    const feedbackLines = doc.splitTextToSize(feedback, maxWidth);
    doc.text(feedbackLines, margin, yPosition);
    yPosition += feedbackLines.length * 7 + 10;

    // Questions and Answers
    resultData.result.forEach((item, index) => {
      doc.setFontSize(14);
      const questionText = `${index + 1}. ${item.question}`;
      const questionLines = doc.splitTextToSize(questionText, maxWidth);
      doc.text(questionLines, margin, yPosition);
      yPosition += questionLines.length * 7 + 5;

      doc.setFontSize(10);
      const yourAnswer = `Your Answer: ${item.selectedAnswer}`;
      const yourAnswerLines = doc.splitTextToSize(yourAnswer, maxWidth);
      doc.text(yourAnswerLines, margin + 5, yPosition);
      yPosition += yourAnswerLines.length * 5 + 3;

      if (!item.isCorrect) {
        const correctAnswer = `Correct Answer: ${item.correctAnswer}`;
        const correctAnswerLines = doc.splitTextToSize(correctAnswer, maxWidth);
        doc.text(correctAnswerLines, margin + 5, yPosition);
        yPosition += correctAnswerLines.length * 5 + 3;
      }

      const explanation = `Explanation: ${item.explanation}`;
      const explanationLines = doc.splitTextToSize(explanation, maxWidth);
      doc.text(explanationLines, margin + 5, yPosition);
      yPosition += explanationLines.length * 5 + 10;

      // Add new page if content is too long
      if (yPosition > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPosition = 20;
      }
      navigate(`/quiz/${courseId}/${lessonId}`)
      
    });

    doc.save("Quiz_Results.pdf");
  };

  useEffect(() => {
  window.history.pushState(null, null, window.location.pathname);

  const handlePopState = () => {
    navigate(`/quiz/${courseId}/${lessonId}`, { replace: true, state: { triggerDownload: true } });
  };

  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, [navigate, courseId, lessonId]);


  if (!resultData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <span className="loading loading-dots loading-lg text-indigo-500"></span>
      </div>
    );
  }

  const { score, totalQuestions, result } = resultData;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-100 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-400 mb-2">Quiz Results</h1>
        <p className="text-lg">
          You scored <span className="text-indigo-300 font-semibold">{score}</span> out of{" "}
          <span className="text-indigo-300 font-semibold">{totalQuestions}</span>
        </p>
        <p className="mt-2 text-base text-accent italic flex justify-center items-center gap-1">
          {getPerformanceFeedback(score, totalQuestions)}
        </p>
      </div>

      <div className="space-y-6">
        {result.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow transition hover:shadow-lg"
          >
            <h3 className="font-semibold text-lg text-indigo-300 mb-2">
              {index + 1}. {item.question}
            </h3>

            <p className={`mb-1 ${item.isCorrect ? "text-green-400" : "text-red-400"}`}>
              Your Answer: {item.selectedAnswer}
            </p>

            {!item.isCorrect && (
              <p className="text-green-400 mb-1">
                Correct Answer: {item.correctAnswer}
              </p>
            )}

            <p className="text-sm text-gray-400 italic">
              Explanation: {item.explanation}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-10">
        <button
          onClick={handleDownloadPDF}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          Save Result
        </button>
      </div>
    </div>
  );
};

export default ResultPage;