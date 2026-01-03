import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

// Initialize Express application
const app: Application = express();

// Middleware setup
// Capture raw request body for Stripe webhooks signature verification.
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      if (req.originalUrl?.startsWith("/api/orders/webhook")) {
        req.rawBody = buf;
      }
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://reputation-management-frontend.vercel.app",
    credentials: true,
  })
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
