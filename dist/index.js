"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = require("./logger");
const axios_1 = __importDefault(require("axios"));
const cron_1 = require("cron");
let server;
// Cron job for pinging the server
const job = new cron_1.CronJob("*/12 * * * *", async () => {
    try {
        await axios_1.default.get(config_1.default.pingUrl, { timeout: 30000 });
        logger_1.logger.info("URL pinged successfully");
    }
    catch (error) {
        logger_1.logger.error("Error pinging URL:", error.message);
        if (error) {
            setTimeout(async () => {
                try {
                    await axios_1.default.get(config_1.default.pingUrl, { timeout: 10000 });
                }
                catch (retryError) {
                    logger_1.logger.error("Retry ping failed:", retryError.message);
                }
            }, 10000);
        }
    }
});
// Start cron job
job.start();
// Connect to MongoDB and start server
mongoose_1.default
    .connect(config_1.default.mongoose.url, { dbName: config_1.default.mongoose.dbName })
    .then(() => {
    logger_1.logger.info("Connected to MongoDB");
    server = app_1.default.listen(config_1.default.port, () => {
        logger_1.logger.info(`Listening to port ${config_1.default.port}`);
    });
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger_1.logger.info("Server closed");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    logger_1.logger.error(error);
    exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    logger_1.logger.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
process.on("SIGINT", async () => {
    logger_1.logger.info("SIGINT signal received: closing MongoDB connection and stopping cron job");
    await mongoose_1.default.connection.close();
    job.stop();
    logger_1.logger.info("MongoDB connection closed, cron job stopped");
    process.exit(0);
});
