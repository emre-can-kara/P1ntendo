import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"; // ✅ React Router v5
import axiosInstance from "../utils/axios";

function SignupPage() {
  const [roles, setRoles] = useState([]); // Stores fetched roles
  const [loading, setLoading] = useState(false); // Spinner state
  const [errorMessage, setErrorMessage] = useState(""); // Stores backend errors
  const history = useHistory(); // ✅ React Router v5 history

  const [formData, setFormData] = useState({
    name: "", // ✅ Backend expects `name`
    email: "",
    password: "",
    confirmPassword: "",
    role_id: "", // Set dynamically
    agreeToTerms: false, // ✅ Agree to terms checkbox
  });

  // Fetch roles when the component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/roles"); // ✅ Fetch roles from API
        setRoles(response.data); // ✅ Store roles in state
        setFormData((prev) => ({
          ...prev,
          role_id:
            response.data.find((role) => role.name === "Customer")?.id ||
            response.data[0]?.id,
        }));
      } catch (error) {
        console.error("Error fetching roles:", error.response?.data || error.message);
      }
    };

    fetchRoles();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Show spinner
    setErrorMessage(""); // ✅ Reset error messages

    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      alert("Passwords do not match!");
      return;
    }

    if (!formData.agreeToTerms) {
      setLoading(false);
      alert("You must agree to the terms and conditions!");
      return;
    }

    // ✅ Prepare the request payload
    let requestData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role_id: parseInt(formData.role_id)
    };

    try {
      const response = await axiosInstance.post("/signup", requestData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setLoading(false); // ✅ Hide spinner

      // ✅ Show activation warning and redirect to the previous page
      alert("You need to click the link in your email to activate your account!");
      history.goBack(); // ✅ React Router v5 redirect to previous page
    } catch (error) {
      setLoading(false); // ✅ Hide spinner
      console.error("Signup Error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "An error occurred during signup");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select name="role_id" value={formData.role_id} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              {roles.map((role) => (
    <option key={role.id} value={role.id}>
      {role.name} {/* Show "Yönetici", "Mağaza", "Müşteri" */}
    </option>
                ))}
              </select>
            </div>

            {/* Agree to Terms */}
            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Submit Button with Spinner */}
            <div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
