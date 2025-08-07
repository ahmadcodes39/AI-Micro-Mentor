import toast from "react-hot-toast";
import api from "../lib/axiosInstance";

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server.");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Login failed");
    return null;
  }
};

export const signUpUser = async ({
  firstname,
  lastname,
  email,
  password,
  goals,
}) => {
  try {
    const response = await api.post(
      "/auth/register",
      { firstname, lastname, email, password, goals },
      { withCredentials: true }
    );

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server.");
    }
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server.");
    }
  } catch (error) {
    console.error("Auth hMe error:", error.response?.data || error.message);
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );

    if (response?.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server.");
    }
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    return { message: "Logout failed" };
  }
};

export const updateProfile = async ( formData ) => {
  const response = await api.patch("/auth/update-profile", formData, {
    withCredentials: true,
  });
  try {
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server.", response.message);
    }
  } catch (error) {
    console.error(
      "Update profile Error:",
      error.response?.data || error.message
    );
    return { message: "Update Profile Error" };
  }
};

