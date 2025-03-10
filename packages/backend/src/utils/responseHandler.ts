import { Response } from 'express';
import { ErrorResponse, SuccessResponse } from "../types/response.handler";

/**
 * Sends a standardized success response to the client.
 *
 * @Template T
 * @param {Response} res - The HTTP response object.
 * @param {T} data - The data to be sent in the response.
 * @param {string} [message] - An optional message to include in the response.
 * @param {number} [statusCode=200] - The HTTP status code for the response. Defaults to 200.
 * @return {void} This function does not return a value.
 */
function success<T>(res: Response, data: T, message?: string, statusCode: number = 200): void {
  res.status(statusCode).json({
    success: true,
    data,
    message
  } satisfies SuccessResponse<T>);
  return
}

/**
 * Sends a formatted JSON error response with the specified message and status code.
 *
 * @param {Response} res - The response object used to send the error.
 * @param {string} message - The error message to be included in the response.
 * @param {number} [statusCode=400] - The HTTP status code to set for the response. Defaults to 400 if not provided.
 * @return {void}
 */
function error(res: Response, message: string, statusCode: number = 400): void {
  res.status(statusCode).json({
    success: false,
    error: {
      message
    }
  } satisfies ErrorResponse);
  return
}

export const ResponseHandler = {
  success,
  error
}