require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

const projectRoutes = require("./routes/projects");
const skillRoutes = require("./routes/skills");
const profileRoutes = require("./routes/profile");
const messageRoutes = require("./routes/messages");
const authRoutes = require("./routes/auth");

app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});