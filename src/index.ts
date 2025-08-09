import mongoose from "mongoose";
import http from "http";
import app from "./app";
import config from "./config/config";
import { logger } from "./logger";
import axios from "axios";
import { CronJob } from "cron";

let server: http.Server;

// Cron job for pinging the server
const job = new CronJob("*/12 * * * *", async () => {
  try {
    await axios.get(config.pingUrl, { timeout: 30000 });
    logger.info("URL pinged successfully");
  } catch (error: any) {
    logger.error("Error pinging URL:", error.message);
    if (error) {
      setTimeout(async () => {
        try {
          await axios.get(config.pingUrl, { timeout: 10000 });
        } catch (retryError: any) {
          logger.error("Retry ping failed:", retryError.message);
        }
      }, 10000);
    }
  }
});

// Start cron job
job.start();

// Connect to MongoDB and start server
mongoose
  .connect(config.mongoose.url, { dbName: config.mongoose.dbName })
  .then(() => {
    logger.info("Connected to MongoDB");
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

process.on("SIGINT", async () => {
  logger.info(
    "SIGINT signal received: closing MongoDB connection and stopping cron job"
  );
  await mongoose.connection.close();
  job.stop();
  logger.info("MongoDB connection closed, cron job stopped");
  process.exit(0);
});
