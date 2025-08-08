import React, { useContext, useState } from "react";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import { Link } from "react-router";
import { loginUser } from "../Components/API/authApi";
import toast from "react-hot-toast";
import { AuthContext } from "../Components/Context/AuthContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { setCurrentUser } = useContext(AuthContext);
  const togglePassword = () => setShowPassword(!showPassword);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  const newErrors = {};
  
  if (!formData.email) newErrors.email = "Email is required";
  if (!formData.password) newErrors.password = "Password is required";
  
  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    try {
      const response = await loginUser(formData);

      if (response && response.success) {
        toast.success(response.message);
        setCurrentUser(response.userObj);
      } else {
        toast.error(response?.message || "Invalid credentials");
      }

    } catch (err) {
      toast.error("An error occurred while logging in.");
    } finally {
      // always stop loading spinner
      setLoading(false);
    }
  } else {
    setLoading(false); // also stop loading if validation fails
  }
};


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-100 px-4">
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">Welcome back</h1>
        <p className="text-sm text-gray-400">Sign in to your account</p>
      </section>

      <div className="bg-base-200 p-6 rounded-md w-full max-w-md shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-white font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
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
                required
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

          <button type="submit" className="btn btn-primary w-full mt-2">
            {loading ? (
              <span className="loading loading-spinner text-secondary"></span>
            ) : (
              <>
                Sign in <MoveRight className="size-5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/register" className="text-sm text-gray-400 ">
            No account{" "}
            <span className="text-sm text-blue-400 hover:underline">
              Create New Account
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
