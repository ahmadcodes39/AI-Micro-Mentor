import api from "../lib/axiosInstance";

export const generateInitialLessonsByAgent = async (topic, courseId ) => {
  const response = await api.post(
    `/lesson/initial-lesson/${courseId}`,
    { topic },
    { withCredentials: true }
  );
  try {
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server ", response.message);
    }
  } catch (error) {
    throw new Error("generate lesson error", error?.response?.message);
  }
};

export const userLessons = async ({ courseId }) => {
  try {
    const response = await api.get(`/lesson/${courseId}`);
    if (response && response.data) {
      return response.data;
    }
    return { lessons: [] };
  } catch (error) {
    if (error?.response?.status === 404) {
      return { lessons: [] };
    } else {
      console.error("Error fetching lessons:", error);
      return null;
    }
  }
};

export const getIndividualLesson = async ({ courseId, lessonId }) => {
  try {
    const response = await api.get(`/lesson/${courseId}/${lessonId}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server ", response.message);
    }
  } catch (error) {
    throw new Error("generate lesson error", error?.response?.message);
  }
};

export const addLesson = async ( courseId, topic, courseName ) => {
  try {
    //   console.log("Before calling API ID ",courseId)
    // console.log("Before calling API Course Name ",courseName)
    // console.log("Before calling API lesson Title ",topic)
    const response = await api.post(
      `/lesson/${courseId}`,
      { topic, courseName },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Backend Error in creating lesson: ${error?.response?.data?.message || error.message}`
    );
  }
};

