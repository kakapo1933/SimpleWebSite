import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * A higher-order function that wraps an asynchronous route handler function to catch and
 * handle errors that may occur during its execution. This ensures that any unhandled
 * promise rejections or thrown errors are properly passed to the next middleware in the
 * chain.
 *
 * @param {RequestHandler} fn - The asynchronous route handler function to be wrapped with
 * error handling.
 * @returns {RequestHandler} A new route handler function that executes the provided
 * function and catches any errors, forwarding them to the next middleware.
 */
export const catchAsync = (fn: RequestHandler): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    err.message = `[UNEXPECTED ERROR]\n${err.message}`;
    next(err)
  });
};