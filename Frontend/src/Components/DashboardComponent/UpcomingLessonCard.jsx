import React from "react";
import { useNavigate } from "react-router";

const UpcomingLessonCard = ({ lesson }) => {
  // console.log("lesson data",lesson)
  const navigate = useNavigate()
  const handleNavigation = (course,id)=>{
    navigate(`/lesson/${course}/${id}`)
  }
  return (
    <div className="card bg-base-200 text-white shadow-xl max-w-3xl w-full mx-auto">
      <div className="card-body space-y-4">
        <h2 className="text-2xl font-bold text-primary">📅 Upcoming Lesson</h2>

        <h3 className="text-xl font-semibold">{lesson.title}</h3>

        <div className="flex flex-wrap gap-2">
          {lesson.tags.map((tag, index) => (
            <div key={index} className="badge badge-secondary badge-outline">
              {tag}
            </div>
          ))}
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm"onClick={()=>handleNavigation(lesson.course,lesson._id)}>Start</button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingLessonCard;
