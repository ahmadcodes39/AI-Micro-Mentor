import React from "react";
import { Book, Clock, Tag } from "lucide-react";
import moment from "moment";
import { useNavigate, useParams, useLocation } from "react-router-dom"; 
const IndividualLessonHeader = ({
  title,
  courseName,
  duration = 5,
  tags,
  createdAt,
}) => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); 

  const path = location.pathname;
  let activeTab = "Lesson";
  if (path.includes("/quiz")) activeTab = "Quiz";
  else if (path.includes("/flashcards")) activeTab = "Flash Cards";

  const handleTabClick = (tab) => {
    if (tab === "Lesson") {
      navigate(`/lesson/${courseId}/${lessonId}`);
    } else if (tab === "Quiz") {
      navigate(`/quiz/${courseId}/${lessonId}`);
    } else if (tab === "Flash Cards") {
      navigate(`/flashcards/${courseId}/${lessonId}`);
    }
  };

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-md space-y-4">
      <div className="flex items-center gap-2 text-2xl font-bold text-base-content">
        <Book className="w-6 h-6 text-primary md:flex hidden" />
        {title}
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
        <span>
          <strong>Course:</strong> {courseName}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {duration} min
        </span>
        <span>
          <strong>Created:</strong> {moment(createdAt).fromNow()}
        </span>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="badge badge-primary badge-outline flex items-center gap-1"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-2">
          <div role="tablist" className="tabs tabs-boxed bg-base-300">
            {["Lesson", "Quiz", "Flash Cards"].map((tab) => (
              <button
                key={tab}
                role="tab"
                className={`tab ${activeTab === tab ? "tab-active" : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualLessonHeader;
