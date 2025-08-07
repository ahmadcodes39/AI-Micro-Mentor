import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import Dashboard from "./Pages/Dashboard";
import MyCourses from "./Pages/MyCourses";
import CourseDetailPage from "./Pages/CourseDetailPage";
import AppLayout from "./Components/Layout/AppLayout";
import { getCurrentUser } from "./Components/API/authApi";
import { AuthContext } from "./Components/Context/authContext";
import LessonDetailPage from "./Pages/LessonDetailPage";
import FlashCardsPage from "./Pages/FlashCardsPage";
import QuizPage from "./Pages/QuizPage";
import SettingPage from "./Pages/SettingPage";
import QuizDetailPage from "./Pages/QuizDetailPage";
import ResultPage from "./Pages/ResultPage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      const response = await getCurrentUser();
      setCurrentUser(response?.user);
      setLoading(false);
    };
    getUser();
  }, []);
  const isAuthenticated = Boolean(currentUser?._id);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  return (
    <div data-theme={"dark"}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <SignUpPage />
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to={"/dashboard"} /> : <LoginPage />
            }
          />
          <Route
            path="/dashboard"
            element={
              <AppLayout showSideBar={true}>
                {isAuthenticated ? <Dashboard /> : <Navigate to={"/"} />}
              </AppLayout>
            }
          />
          <Route
            path="/course/:courseId"
            element={
              <AppLayout showSideBar={true}>
                {isAuthenticated ? <CourseDetailPage /> : <Navigate to={"/"} />}
              </AppLayout>
            }
          />
          <Route
            path="/my-courses"
            element={
              <AppLayout showSideBar={true}>
                {isAuthenticated ? <MyCourses /> : <Navigate to={"/"} />}
              </AppLayout>
            }
          />

          <Route
            path="/lesson/:courseId/:lessonId"
            element={
              <AppLayout showSideBar={true}>
                {isAuthenticated ? <LessonDetailPage /> : <Navigate to={"/"} />}
              </AppLayout>
            }
          />
          <Route
            path="/flashcards/:courseId/:lessonId"
            element={
              <AppLayout showSideBar={true}>
                {isAuthenticated ? <FlashCardsPage /> : <Navigate to={"/"} />}
              </AppLayout>
            }
          />
          <Route
            path="/quiz/:courseId/:lessonId"
            element={
              <AppLayout showSideBar={true}>
                {isAuthenticated ? <QuizPage /> : <Navigate to={"/"} />}
              </AppLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <AppLayout showSideBar={true}>
                {isAuthenticated ? <SettingPage /> : <Navigate to={"/"} />}
              </AppLayout>
            }
          />
          <Route
            path="/test/:courseId/:lessonId/:quizId"
            element={
              <AppLayout showSideBar={false}>
                {isAuthenticated ? <QuizDetailPage /> : <Navigate to={"/"} />}
              </AppLayout>
            }
          />
          <Route
            path="/result/:courseId/:lessonId"
            element={
              <AppLayout showSideBar={false}>
                {isAuthenticated ? (
                  <ResultPage />
                ) : (
                  <Navigate to={"/"} replace={true} />
                )}
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
