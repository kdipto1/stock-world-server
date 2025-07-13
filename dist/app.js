"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = require("./logger");
const errors_1 = require("./errors");
const v1_1 = __importDefault(require("./app/routes/v1"));
const app = (0, express_1.default)();
if (config_1.default.nodeEnv !== "test") {
    app.use(logger_1.morgan.successHandler);
    app.use(logger_1.morgan.errorHandler);
}
// enable cors
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// v1 api routes
app.use("/api/v1", v1_1.default);
// Root route
app.get("/", (req, res) => {
    res.send("StockWorld API is running!");
});
// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
    next(new errors_1.ApiError(http_status_1.default.NOT_FOUND, "Not found"));
});
// convert error to ApiError, if needed
app.use(errors_1.errorConverter);
// handle error
app.use(errors_1.errorHandler);
exports.default = app;
