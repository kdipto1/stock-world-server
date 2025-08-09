"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const validationErrors = error.issues.map((err) => ({
                field: err.path.join('.') || 'unknown',
                message: err.message
            }));
            const apiError = new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Validation failed');
            // Add validation errors to the error object for the error handler
            apiError.validationErrors = validationErrors;
            next(apiError);
        }
        else {
            next(error);
        }
    }
};
exports.default = validate;
