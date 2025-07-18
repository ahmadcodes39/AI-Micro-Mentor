import React, { useContext, useState } from "react";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import { Link } from "react-router";
import { signUpUser } from "../Components/API/authApi";
import toast from "react-hot-toast";
import { AuthContext } from "../Components/Context/authContext";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    goals: "",
  });
  const [errors, setErrors] = useState({});
  const {setCurrentUser} = useContext(AuthContext)
  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.goals) newErrors.goals = "Goal is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const response = await signUpUser(formData)
      if (response) {
        toast.success(response.message)
        console.log("Sign up data ",response)
        setCurrentUser(response.user)
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-100 px-4">
      <section className="text-center mb-2">
        <h1 className="text-3xl font-bold text-white mb-1">
          Create an account
        </h1>
        <p className="text-sm text-gray-400">Join us and start your journey</p>
      </section>

      <div className="bg-base-200 p-6 rounded-md w-full max-w-md shadow-md">
        <button className="btn w-full mb-4 btn-outline flex items-center justify-center gap-2">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign Up with Google
        </button>

        <div className="divider text-gray-400">or</div>

        <form onSubmit={handleSubmit} className="">
          <div className="flex gap-2">
            <div>
              <label className="label text-white font-medium">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                name="firstname"
                type="text"
                placeholder="Enter your First name"
                className={`input input-bordered w-full bg-base-300 text-white ${
                  errors.firstname ? "input-error" : ""
                }`}
                value={formData.firstname}
                onChange={handleChange}
              />
              {errors.firstname && (
                <p className="text-sm text-red-500 mt-1">{errors.firstname}</p>
              )}
            </div>
            <div>
              <label className="label text-white font-medium">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                name="lastname"
                type="text"
                placeholder="Enter your Last name"
                className={`input input-bordered w-full bg-base-300 text-white ${
                  errors.lastname ? "input-error" : ""
                }`}
                value={formData.lastname}
                onChange={handleChange}
              />
              {errors.lastname && (
                <p className="text-sm text-red-500 mt-1">{errors.lastname}</p>
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
              placeholder="Enter your email address"
              className={`input input-bordered w-full bg-base-300 text-white ${
                errors.email ? "input-error" : ""
              }`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="label text-white font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`input input-bordered w-full bg-base-300 text-white pr-10 ${
                  errors.password ? "input-error" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-400"
                onClick={togglePassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <div>
              <label
                htmlFor="learningGoal"
                className="label font-medium text-white"
              >
                Learning Goal <span className="text-red-500">*</span>
              </label>
              <select
                name="goals"
                id="learningGoal"
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
                <p className="text-sm text-red-500 mt-1">{errors.goals}</p>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-2">
            Sign Up <MoveRight className="size-5" />
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to={"/login"} className="text-sm text-gray-400 ">
            Already have an account{" "}
            <span className="text-sm text-blue-400 hover:underline">
              Sign in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
