const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_fallback_secret_key"; // Use a secure key

// ✅ Middleware to verify JWT token from cookies
exports.authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies?.authToken; // Safely access cookies

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify JWT
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
      }

      req.user = decoded; // Attach user data to request
      next(); // Proceed to next middleware/controller
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
