import React, { useEffect, useState } from "react";
import WelcomeHeader from "../Components/DashboardComponent/WelcomeHeader";
import { getAllCourses, getUserStats } from "../Components/API/coursesApi";
import toast from "react-hot-toast";
import StatsCard from "../Components/DashboardComponent/StatsCard";
import CourseSection from "../Components/DashboardComponent/CourseSection";
import QuickActions from "../Components/DashboardComponent/QuickActions";
import UpcomingLessonCard from "../Components/DashboardComponent/UpcomingLessonCard";

const Dashboard = () => {
  const [cardStats, setCardsStats] = useState({
    lessonCompleted: 0,
    quizAttempted: 0,
    totalCourses: 0,
    totalFlashCards: 0,
  });

  const [courseData, setCourseData] = useState([]);
  const [completeData, setCompleteData] = useState({});
  const [loading, setLoading] = useState(true); // start with true
  const [extractedData, setExtractedData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const [statsRes, coursesRes] = await Promise.all([
          getUserStats(),
          getAllCourses(),
        ]);

        if (statsRes && !statsRes.error) {
          setCardsStats({
            lessonCompleted: statsRes.stats.lessonCompleted,
            quizAttempted: statsRes.stats.quizAttempted,
            totalCourses: statsRes.stats.totalCourses,
            totalFlashCards: statsRes.stats.totalFlashCards,
          });
          setCompleteData(statsRes.stats);
        } else {
          toast.error(statsRes.message || "Failed to load stats");
        }

        if (coursesRes && coursesRes.courses) {
          setCourseData(coursesRes.courses);
          const extracted = coursesRes.courses.map((item) => ({
            id: item?._id || null,
            name: item?.name || "",
            category: item?.category || "",
            totalLessons: item?.totalLessons || 0,
            completedLessons: item?.completedLessons || 0,
            progress: item?.progress || 0,
          }));
          setExtractedData(extracted);
        }
      } catch (err) {
        toast.error("Something went wrong while loading dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] w-full">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <WelcomeHeader />
      <StatsCard cardStats={cardStats} />

      {(completeData?.recentCourse || completeData?.upcomingLessons) && (
        <>
      <h1 className="mt-4 mb-3 text-2xl font-medium text-primary">
        Next Up in Your Learning
      </h1>

          <div className="flex items-center gap-2 md:flex-row flex-col">
            {completeData?.recentCourse && (
              <QuickActions courseData={completeData.recentCourse} />
            )}
            {completeData?.upcomingLessons && (
              <UpcomingLessonCard lesson={completeData.upcomingLessons} />
            )}
          </div>
        </>
      )}

      <CourseSection extractedData={extractedData} />
    </div>
  );
};

export default Dashboard;
