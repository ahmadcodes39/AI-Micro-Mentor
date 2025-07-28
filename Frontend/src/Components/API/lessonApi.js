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
    return response?.data ?? { lessons: [] };
  } catch (error) {
    if (error?.response?.status === 404) {
      return { lessons: [] };
    }
    console.error("Error fetching lessons:", error);
    return { lessons: [] };
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

export const updateLesson = async ( courseId, lessonId ) => {
  try {
    const response = await api.patch(`/lesson/update-lesson/${courseId}/${lessonId}`,{withCredentials:true});
    return response.data;
  } catch (error) {
    throw new Error(
      `Backend Error in updating lesson: ${error?.response?.data?.message || error.message}`
    );
  }
};

export const deleteLesson = async ( courseId, lessonId ) => {
  try {
    const response = await api.delete(`/lesson/delete/${courseId}/${lessonId}`,{withCredentials:true});
    if (response && response.data) {
      return response.data;
    }
    else{
      throw new Error("Error in deleting the lesson",response.message);
      
    }
  } catch (error) {
    throw new Error(
      `Backend Error in updating lesson: ${error?.response?.data?.message || error.message}`
    );
  }
};

