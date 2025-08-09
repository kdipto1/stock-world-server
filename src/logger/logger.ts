import winston from "winston";
import config from "../config/config";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const addRequestIdFormat = winston.format((info) => {
  const requestId = info.requestId || 'N/A';
  info.message = `[RequestID: ${requestId}] ${info.message}`;
  return info;
});

const logger = winston.createLogger({
  level: config.nodeEnv === "development" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    enumerateErrorFormat(),
    addRequestIdFormat(),
    config.nodeEnv === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    ),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

export default logger;
