import React, { useEffect, useState } from "react";
import LessonHeader from "../Components/MyCoursesComponents/LessonHeader";
import LessonCards from "../Components/MyCoursesComponents/LessonCards";
import LessonStats from "../Components/MyCoursesComponents/LessonStats";
import { generateInitialLessonsByAgent, userLessons } from "../Components/API/lessonApi";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { Bot } from "lucide-react";

const CourseDetailPage = () => {
  const { courseId, topic } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loadingAgent, setLoadingAgent] = useState(false);

  // Utility: Delay
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const getUserLessons = async () => {
      const response = await userLessons({ courseId });
      if (response) {
        console.log("Fetched lessons:", response.lessons);
        setLessons(response.lessons);

        if (response.lessons.length === 0 && topic) {
          console.log("No lessons found. Starting agent...");
          createLessonsByAgent();
        }
      } else {
        console.error("Failed to fetch lessons.");
      }
    };
    getUserLessons();
  }, []);

  const createLessonsByAgent = async () => {
    setLoadingAgent(true);
    console.log("Creating lessons for topic:", topic);

    for (let i = 0; i < 3; i++) {
      try {
        const res = await generateInitialLessonsByAgent({ topic, courseId });
        console.log(`Lesson ${i + 1} created:`, res.lesson);
        toast.success(`Lesson "${res.lesson.title}" created`);
      } catch (err) {
        toast.error("Lesson creation failed.");
        console.error("Agent Error:", err);
      }

      if (i < 2) await wait(3000 + Math.random() * 2000);
    }

    const updated = await userLessons({ courseId });
    if (updated) setLessons(updated.lessons);

    setLoadingAgent(false);
  };

  const courseName = lessons[0]?.course?.name || "Course";
  const tags = lessons[0]?.tags || [];
  const totalLessons = lessons.length;

  return (
    <div className="p-4 space-y-6">
      <LessonHeader name={courseName} category={tags} totalLessons={totalLessons} />

      <LessonStats
        totalLessons={totalLessons}
        description="Track your course progress and see how many lessons you've created so far."
      />

      {loadingAgent ? (
        <div className="flex flex-col items-center justify-center gap-3 p-8 bg-base-200 rounded-lg shadow">
          <Bot className="h-12 w-12 text-primary animate-bounce" />
          <p className="text-white text-lg font-medium">
            Agent is creating lessons. Please wait...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <LessonCards key={lesson._id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
