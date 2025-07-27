import api from "../lib/axiosInstance";

export const getAllCourses = async () => {
  try {
    const response = await api.get("/courses", {}, { withCredentials: true });
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected error from server");
    }
  } catch (error) {
    console.error(
      `Error from server fetching courses ${error?.response?.message}`
    );
  }
};

export const addNewCourse = async ({ name, description, category }) => {
  try {
    const response = await api.post(
      "/courses",
      { name, description, category },
      { withCredentials: true }
    );
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected Response from server");
    }
  } catch (error) {
    console.error("Error adding course " + error?.response?.message);
  }
};

export const deleteCourse = async ({ id }) => {
  try {
    const response = await api.delete(`/courses/${id}`, {
      withCredentials: true,
    });
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected Response from server");
    }
  } catch (error) {
    console.error("Error deleting course " + error?.response?.message);
  }
};

export const getUserStats = async () => {
  try {
    const response = await api.get("/courses/user-stats", {
      withCredentials: true,
    });
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected Response from server");
    }
  } catch (error) {
    console.error("Error getting stats:", error?.response?.data?.message || error.message);
    return { error: true, message: error?.response?.data?.message || "Failed to fetch stats" };
  }
};

