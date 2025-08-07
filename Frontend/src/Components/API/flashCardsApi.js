import api from "../lib/axiosInstance";

export const generateInitialFlashCards = async (courseId, lessonId, topic) => {
  try {
    const response = await api.post(
      `/flashCards/${courseId}/${lessonId}`,
      { topic },
      { withCredentials: true }
    );

    if (response && response.data) {
      return response.data;
    } else {
      return { cards: [] };
    }
  } catch (error) {
    // console.log(
    //   "Error in generating the flashcards:",
    //   error?.response?.data?.message || error.message
    // );
    return { cards: [] };
  }
};

export const getUserFlashCards = async (courseId, lessonId) => {
  try {
    const response = await api.get(`/flashCards/${courseId}/${lessonId}`, {
      withCredentials: true,
    });

    if (response && response.data) {
      return response.data;
    } else {
      return { cards: [] };
    }
  } catch (error) {
    // console.log(
    //   "Error in getting the flashcards:",
    //   error?.response?.data?.message || error.message
    // );
    return { cards: [] };
  }
};

export const deleteFlashCard = async (id) => {
  try {
    const response = await api.delete("/flashCards/delete-card", {
      data: { id },
      withCredentials: true,
    });

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected behaviour from server");
    }
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error.message
    );
  }
};

