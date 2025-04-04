

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();

// const authRoutes = require("./routes/authRoutes");

// const app = express();

// // Configure CORS to allow requests only from your frontend
// app.use(cors({
//     origin: "http://localhost:3000", // Allow frontend URL
//     credentials: true, // Allow cookies and authentication headers
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
// }));

// app.use(bodyParser.json());

// app.use("/api/auth", authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes"); // Import authentication routes

const app = express();

// ✅ Allow multiple origins dynamically
const allowedOrigins = ["http://localhost:3000", "http://localhost:3002"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ Allow cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware
app.use(cookieParser()); // ✅ Enable cookie parsing
app.use(express.json()); // ✅ Parse JSON bodies

// ✅ Routes
app.use("/api/auth", authRoutes); // Mount authentication routes

// ✅ Global Error Handling
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
