import express, { Express } from "express";
import cors from "cors";
import httpStatus from "http-status";
import config from "./config/config";
import { morgan } from "./logger";
import { ApiError, errorConverter, errorHandler } from "./errors";
import routes from "./app/routes/v1";

const app: Express = express();

if (config.nodeEnv !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// enable cors
app.use(cors());
app.options("*", cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// v1 api routes
app.use("/api/v1", routes);

// Root route
app.get("/", (req, res) => {
  res.send("StockWorld API is running!");
});

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
