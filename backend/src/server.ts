import { Server } from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

let server: Server;

// Main application entry point
async function main() {
  try {
    // Connect to MongoDB database
    await mongoose.connect(config.databaseUrl as string);
    console.log("Connected to the database");

    // Start Express server
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Unahandled rejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", () => {
  console.log(`Uncaught Exception is detected , shutting down ...`);
  process.exit(1);
});
