
import { useState } from "react";
import axios from "axios";
import OTPVerification from "./OTPVerification";
import Register from "./Register";

const Login = ({ setIsLoginOpen, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post("https://munch-mates.onrender.com/api/user/auth/login", {
        email,
        password,
      });

      if (res.data.status === "otp_sent") {
        setUserData(res.data.user); // Save user data
        setOtpStep(true);
      } else {
        setError("Unexpected response. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ OTP Verification
  if (otpStep) {
    return (
      <OTPVerification
        email={email}
        userData={userData}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={(user) => {
          onLoginSuccess(user); // pass user to parent
          setIsLoginOpen(false);
        }}
      />
    );
  }

  // ✅ Registration screen
  if (showRegister) {
    return (
      <Register
        onClose={() => setShowRegister(false)}
        openLoginAgain={() => setShowRegister(false)}
      />
    );
  }

  // ✅ Login form
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={() => setIsLoginOpen(false)}
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center text-fuchsia-700">Login</h2>
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-fuchsia-300 rounded mb-2"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-fuchsia-300 rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white px-4 py-2 rounded mt-1 w-full"
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Login"}
        </button>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => setShowRegister(true)}
            className="text-fuchsia-600 hover:underline font-medium"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
