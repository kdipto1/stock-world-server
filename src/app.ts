import express, { Express } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import httpStatus from "http-status";
import config from "./config/config";
import { morgan } from "./logger";
import { ApiError, errorConverter, errorHandler } from "./errors";
import routes from "./app/routes/v1";

const app: Express = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

if (config.nodeEnv !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// enable cors with specific configuration
const corsOptions = {
  origin: config.nodeEnv === "production" ? config.corsOrigin : "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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
