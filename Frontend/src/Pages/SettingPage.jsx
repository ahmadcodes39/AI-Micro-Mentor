import React, { useContext, useEffect, useState } from "react";
import { getCurrentUser, updateProfile } from "../Components/API/authApi";
import { UserRoundPen, MoveRight, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../Components/Context/authContext";
import { useNavigate } from "react-router";

const SettingPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    avatar: "",
    email: "",
    goals: "",
  });
  const [errors, setErrors] = useState({});
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleGenerateAvatar = () => {
     const index = Math.floor(Math.random() * 100) + 1;
       const randomAvatar = `https://avatar.iran.liara.run/public/${index}`;
    setFormData((prev) => ({ ...prev, avatar: randomAvatar }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.goals) newErrors.goals = "Goal is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await updateProfile(formData);
      if (response) {
        toast.success("Profile updated successfully!");
        setCurrentUser(response.user);
        navigate('/my-courses')
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getCurrentUser();
        if (response?.user) {
          setFormData({
            firstname: response.user.firstname || "",
            lastname: response.user.lastname || "",
            email: response.user.email || "",
            avatar: response.user.avatar || "",
            goals: response.user.learningGoal || "",
          });
          setCurrentUser(response.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    getUserData();
  }, []);

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <img
          src={formData.avatar || null}
          alt="User Avatar"
          className="w-28 h-28 rounded-full border-4 border-primary shadow-md"
        />
        <button
          type="button"
          onClick={handleGenerateAvatar}
          className="btn btn-primary btn-outline btn-sm mt-2 flex items-center gap-2"
        >
          <RefreshCcw className="size-4" />
          Generate Random Avatar
        </button>
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2 mt-4">
          <UserRoundPen className="size-8" />
          Profile Settings
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xl mt-8 space-y-3 sm:pb-2 md:pb-0 pb-24">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="label text-white font-medium">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              name="firstname"
              type="text"
              className={`input input-bordered w-full bg-base-300 text-white ${
                errors.firstname ? "input-error" : ""
              }`}
              placeholder="Enter first name"
              value={formData.firstname}
              onChange={handleChange}
            />
            {errors.firstname && (
              <p className="text-sm text-red-500">{errors.firstname}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="label text-white font-medium">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              name="lastname"
              type="text"
              className={`input input-bordered w-full bg-base-300 text-white ${
                errors.lastname ? "input-error" : ""
              }`}
              placeholder="Enter last name"
              value={formData.lastname}
              onChange={handleChange}
            />
            {errors.lastname && (
              <p className="text-sm text-red-500">{errors.lastname}</p>
            )}
          </div>
        </div>

        <div>
          <label className="label text-white font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            className={`input input-bordered w-full bg-base-300 text-white ${
              errors.email ? "input-error" : ""
            }`}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="label text-white font-medium">
            Learning Goal <span className="text-red-500">*</span>
          </label>
          <select
            name="goals"
            className={`select select-bordered w-full bg-base-300 text-white ${
              errors.goals ? "select-error" : ""
            }`}
            value={formData.goals}
            onChange={handleChange}
          >
            <option value="">Select your goal</option>
            <option value="Web">Web</option>
            <option value="Programming">Programming</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="Other">Other</option>
          </select>
          {errors.goals && (
            <p className="text-sm text-red-500">{errors.goals}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4 ">
          {loading ? (
            <span className="loading loading-spinner text-secondary"></span>
          ) : (
            <>
              Update Profile <MoveRight className="size-5 ml-2" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SettingPage;
