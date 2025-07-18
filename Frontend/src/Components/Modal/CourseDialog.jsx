import React, { useState } from "react";
import { addNewCourse } from "../API/coursesApi";
import toast from "react-hot-toast";

const CourseDialog = ({ refreshCourses }) => {
  const [formData, setFormData] = useState({
    courseName: "",
    shortDescription: "",
    category: "",
    otherCategory: "",
  });

  const [loading, setLoading] = useState(false);

  const categories = [
    "Programming",
    "Web",
    "Frontend",
    "Backend",
    "Database",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const closeDialog = () => {
    document.getElementById("my_modal_1").close();
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalCategory =
      formData.category === "Other"
        ? formData.otherCategory
        : formData.category;

    const newCourse = {
      name: formData.courseName,
      description: formData.shortDescription,
      category: finalCategory,
    };

    try {
      const response = await addNewCourse(newCourse);
      if (response) {
        toast.success(response.message);
        refreshCourses();
        document.getElementById("my_modal_1").close();
        setFormData({
          courseName: "",
          shortDescription: "",
          category: "",
          otherCategory: "",
        });
      } else {
        toast.error("Failed to create course.");
      }
    } catch (error) {
      toast.error("Error while creating course.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-base-100 text-white">
        <h3 className="font-bold text-xl mb-4">Create New Course</h3>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="label font-medium">Course Name</label>
            <input
              type="text"
              name="courseName"
              required
              placeholder="Enter course name"
              className="input input-bordered w-full bg-base-300 text-white"
              value={formData.courseName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label font-medium">Short Description</label>
            <textarea
              name="shortDescription"
              required
              placeholder="Enter short description"
              className="textarea textarea-bordered w-full bg-base-300 text-white"
              value={formData.shortDescription}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label font-medium">Category</label>
            <select
              name="category"
              required
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
                required
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
                "Create Course"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CourseDialog;
