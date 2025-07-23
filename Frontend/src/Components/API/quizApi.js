import api from "../lib/axiosInstance";

export const generateQuiz = async (courseID, lessonID, topic) => {
  const response = await api.post(
    `/quiz/create-quiz/${courseID}/${lessonID}`,
    { topic },
    { withCredentials: true }
  );
  try {
    if (response && response.data) {
      return response.data;
    } else {
      return { quiz: [] };
    }
  } catch (error) {
    throw new Error("Error generating the quiz " + error);
  }
};
export const getAllQuizes = async () => {
  const response = await api.get(`/quiz/quiz-history`, {
    withCredentials: true,
  });
  try {
    if (response && response.data) {
      return response.data;
    } else {
      return { quiz: [] };
    }
  } catch (error) {
    throw new Error("Error getting the quiz " + error);
  }
};

export const getSpecificQuiz = async (courseId, lessonId) => {
  try {
    const response = await api.get(`/quiz/get-quiz/${courseId}/${lessonId}`, { withCredentials: true });
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected error from server " + response.message);
    }
  } catch (error) {
    throw new Error("Server error " + error);
  }
};
