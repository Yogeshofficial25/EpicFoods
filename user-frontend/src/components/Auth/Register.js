import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { X } from "lucide-react"; // Optional: nice close icon

const Register = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://munch-mates.onrender.com/api/user/auth/register",
        formData
      );

      if (res.status === 201) {
        toast.success("Registration successful! Please login now.");
        if (onClose) onClose(); // Close modal after success
      }
    } catch (err) {
      const msg = err.response?.data?.error;
      if (err.response?.status === 409) {
        if (msg?.includes("Email")) {
          toast.error("Email already exists. Please login.");
        } else if (msg?.includes("Mobile")) {
          toast.error("Mobile number already exists. Please login.");
        } else {
          toast.error("User already exists. Please login.");
        }
      } else {
        toast.error(msg || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">

        {/* Close button top-right */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center text-fuchsia-700">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-fuchsia-300 rounded mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-fuchsia-300 rounded mb-2"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Enter Mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full p-2 border border-fuchsia-300 rounded mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-fuchsia-300 rounded mb-4"
        />

        <button
          onClick={handleRegister}
          className={`bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white px-4 py-2 rounded w-full ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-fuchsia-700 font-medium underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
