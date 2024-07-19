import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/usersRoute";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
app.use(cookieParser());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running really on http://localhost:${PORT}`);
});