import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

// Initialize Express application
const app: Application = express();

// Middleware setup

app.use(
  cors({
    origin: "https://reputation-management-frontend.vercel.app",
    credentials: true,
  }),
);

// API routes
app.use("/api", router);

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).send({
      success: true,
      message: "Server is running! ⚡",
    });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Something went wrong!",
      success: false,
      error: err.errors,
      stack: err.stack,
    });
  }
});

export default app;
