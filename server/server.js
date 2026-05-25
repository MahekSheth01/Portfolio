const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const morgan = require("morgan");
dotenv.config();

connectDB();

const app = express();


if (
  process.env.NODE_ENV ===
  "development"
) {
  app.use(morgan("dev"));
}
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      // Allow any localhost / 127.0.0.1 (local dev)
      const isLocal = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
      if (isLocal) return callback(null, true);

      // Allow any Vercel deployment (including preview URLs)
      const isVercel = origin.endsWith(".vercel.app");
      if (isVercel) return callback(null, true);

      // Allow specific production URL from env
      const productionURL = process.env.CLIENT_URL;
      if (productionURL && origin === productionURL) return callback(null, true);

      callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const projectRoutes = require("./routes/projectRoutes");
const achievementRoutes = require(
  "./routes/achievementRoutes"
);
const uploadRoutes = require(
  "./routes/uploadRoutes"
);
const messageRoutes = require(
  "./routes/messageRoutes"
);
const skillRoutes = require(
  "./routes/skillRoutes"
);
const timelineRoutes = require(
  "./routes/timelineRoutes"
);
const settingRoutes = require(
  "./routes/settingRoutes"
);
const dashboardRoutes = require(
  "./routes/dashboardRoutes"
);
const {
  notFound,
  errorHandler,
} = require(
  "./middleware/errorMiddleware"
);

// DEBUG: log requests hitting /api/auth so we can confirm the router mount is active
app.use("/api/auth", (req, _res, next) => {
  console.log(`[API DEBUG] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use("/api/settings", settingRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);
app.use(
  "/api/achievements",
  achievementRoutes
);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);


app.get("/", (req, res) => {
  res.send("Portfolio API Running");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "Server Running",
  });
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

