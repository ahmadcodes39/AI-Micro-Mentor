import React, { useEffect, useState } from "react";
import LessonHeader from "../Components/MyCoursesComponents/LessonHeader";
import LessonCards from "../Components/MyCoursesComponents/LessonCards";
import LessonStats from "../Components/MyCoursesComponents/LessonStats";
import {
  generateInitialLessonsByAgent,
  userLessons,
} from "../Components/API/lessonApi";
import { useLocation, useParams } from "react-router";
import toast from "react-hot-toast";
import { Bot } from "lucide-react";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAgent, setLoadingAgent] = useState(false);
  const location = useLocation()

  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

   const refreshLessons = async () => {
    const response = await userLessons({ courseId });
    if (response) setLessons(response.lessons);
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        const response = await userLessons({ courseId });

        if (response && response.lessons.length > 0) {
          setLessons(response.lessons);
        } else if (location.state) {
          console.log("No lessons found. Starting agent...");
          await handleAgentLessonCreation();
        }

      } catch (err) {
        console.error("Error loading course data:", err);
        toast.error("Failed to load course data");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [courseId, location.state]);

  const handleAgentLessonCreation = async () => {
    setLoadingAgent(true);

    for (let i = 0; i < 1; i++) {
      try {
        const res = await generateInitialLessonsByAgent( location.state, courseId );
        console.log(`Lesson ${i + 1} created:`, res.lesson);
        toast.success(`Lesson "${res.lesson.title}" created`);
      } catch (err) {
        console.error("Agent Error:", err);
        toast.error("Lesson creation failed.");
      }

      if (i < 0) await wait(3000 + Math.random() * 2000);
    }

    const updated = await userLessons({ courseId });
    if (updated) setLessons(updated.lessons);

    await wait(5000);
    setLoadingAgent(false);
  };
  console.log("lesson for curse ",lessons)

const courseName = lessons?.[0]?.course?.name || "Untitled Course";
console.log("course name",courseName)
  const tags = lessons[0]?.tags || courseName;
  const totalLessons = lessons.length;

  return (
    <div className="p-4 space-y-6">
      <LessonHeader
        name={courseName}
        category={courseName.toLowerCase()}
        refreshLessons = {refreshLessons}
      />

      <LessonStats
        totalLessons={totalLessons}
        description="Track your course progress and see how many lessons you've created so far."
      />

      {loading || loadingAgent ? (
        <div className="flex flex-col items-center justify-center gap-3 p-8 bg-base-200 rounded-lg shadow">
          <Bot className="h-12 w-12 text-primary animate-bounce" />
          <p className="text-white text-lg font-medium">
            Agent is creating lessons. Please wait...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <LessonCards key={lesson._id} lesson={lesson} loading={loading} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
