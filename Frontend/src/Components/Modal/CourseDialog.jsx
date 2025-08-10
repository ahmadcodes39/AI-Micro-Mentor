import React, { useEffect, useState } from "react";
import { addNewCourse, updateCourse } from "../API/coursesApi";
import toast from "react-hot-toast";
import { useParams } from "react-router";

const CourseDialog = ({ refreshCourses, courseToEdit }) => {
  const courseId = useParams();
  const [formData, setFormData] = useState({
    courseName: "",
    shortDescription: "",
    category: "",
    otherCategory: "",
  });

  const predefinedCategories = [
    "Programming",
    "Web",
    "Frontend",
    "Backend",
    "Database",
    "Other",
  ];

  const [categories, setCategories] = useState(predefinedCategories);
  const [newError, setNewError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseToEdit) {
      const { name, description, category } = courseToEdit;
      const normalizedCategory = category?.trim();

      if (
        normalizedCategory &&
        !predefinedCategories.includes(normalizedCategory)
      ) {
        setCategories([...predefinedCategories, normalizedCategory]);
      }

      setFormData({
        courseName: name || "",
        shortDescription: description || "",
        category: normalizedCategory || "",
        otherCategory: "",
      });
    }
  }, [courseToEdit]);

  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "courseName") {
      if (!value.trim() || value.trim().length < 3) {
        errorMsg = "Name must be at least 3 characters";
      }
    }

    if (name === "shortDescription") {
      if (!value.trim() || value.trim().length < 10) {
        errorMsg = "Description must be at least 10 characters";
      }
    }

    return errorMsg;
  };

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };  const closeDialog = () => { 
    document.getElementById("my_modal_1").close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = {};
    if (validateField("courseName", formData.courseName)) {
      errors.name = validateField("courseName", formData.courseName);
    }
    if (validateField("shortDescription", formData.shortDescription)) {
      errors.description = validateField("shortDescription", formData.shortDescription);
    }

    setNewError(errors);

    if (Object.keys(errors).length === 0) {
      const finalCategory =
        formData.category === "Other"
          ? formData.otherCategory.trim()
          : formData.category;

      const courseData = {
        name: formData.courseName.trim(),
        description: formData.shortDescription.trim(),
        category: finalCategory,
      };

      try {
        let response;
        if (courseToEdit?._id) {
          response = await updateCourse({
            id: courseToEdit._id,
            ...courseData,
          });
        } else {
          response = await addNewCourse(courseData);
        }

        if (response) {
          toast.success(response.message);
          refreshCourses();
          closeDialog();
          setFormData({
            courseName: "",
            shortDescription: "",
            category: "",
            otherCategory: "",
          });
          setCategories(predefinedCategories);
        } else {
          toast.error("Failed to save course.");
        }
      } catch (error) {
        toast.error("Error while saving course.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-base-100 text-white">
        <h3 className="font-bold text-xl mb-4">
          {courseToEdit?.name ? "Edit Course" : "Create New Course"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="label font-medium">Course Name</label>
            <input
              type="text"
              name="courseName"
              placeholder="Enter course name"
              className="input input-bordered w-full bg-base-300 text-white"
              value={formData.courseName}
              onChange={handleChange}
            />
            {newError.name && (
              <p className="text-sm text-red-500 mt-1">{newError.name}</p>
            )}
          </div>

          <div>
            <label className="label font-medium">Short Description</label>
            <textarea
              name="shortDescription"
              placeholder="Enter short description"
              className="textarea textarea-bordered w-full bg-base-300 text-white"
              value={formData.shortDescription}
              onChange={handleChange}
            />
            {newError.description && (
              <p className="text-sm text-red-500 mt-1">{newError.description}</p>
            )}
          </div>

          <div>
            <label className="label font-medium">Category</label>
            <select
              name="category"
              className="select select-bordered w-full bg-base-300 text-white"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {formData.category === "Other" && (
            <div>
              <label className="label font-medium">Custom Category</label>
              <input
                type="text"
                name="otherCategory"
                placeholder="Enter your custom category"
                className="input input-bordered w-full bg-base-300 text-white"
                value={formData.otherCategory}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="modal-action flex justify-end gap-2">
            <form method="dialog">
              <button
                className="btn btn-outline"
                type="button"
                disabled={loading}
                onClick={closeDialog}
              >
                Cancel
              </button>
            </form>

            <button
              type="submit"
              className="btn btn-primary text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <h1 className="text-sm">
                  {courseToEdit?.name ? "Edit Course" : "Create Course"}
                </h1>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CourseDialog;
