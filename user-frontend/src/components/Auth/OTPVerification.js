// components/OTPVerification.js
import { useState } from "react";
import axios from "axios";

const OTPVerification = ({ email, onSuccess, onClose }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://munch-mates.onrender.com/api/user/auth/verify-otp",
        { email, otp },
        { withCredentials: true }
      );

      if (res.status === 200 && res.data?.status === "verified") {
        alert("Logged in successfully!");
        if (onSuccess) onSuccess(res.data.user?.name || "User");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Verification failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center text-fuchsia-700">
          OTP Verification
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border border-fuchsia-300 rounded mb-2"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white px-4 py-2 rounded mt-3 w-full"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
