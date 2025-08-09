import { NextFunction, Request, Response } from 'express';
import { ZodObject, ZodError, ZodIssue } from 'zod';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';

const validate =
  (schema: ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.issues.map((err: ZodIssue) => ({
          field: err.path.join('.') || 'unknown',
          message: err.message
        }));
        
        const apiError = new ApiError(
          httpStatus.BAD_REQUEST, 
          'Validation failed'
        );
        
        // Add validation errors to the error object for the error handler
        (apiError as any).validationErrors = validationErrors;
        next(apiError);
      } else {
        next(error);
      }
    }
  };

export default validate;
