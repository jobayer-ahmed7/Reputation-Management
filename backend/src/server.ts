import type { Server } from 'http';
import app from './app.js';
import config from './app/config/index.js';
import mongoose from 'mongoose';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log('Connected to the database');

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

main();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Unahandled rejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', () => {
  console.log(`Uncaught Exception is detected , shutting down ...`);
  process.exit(1);
});
