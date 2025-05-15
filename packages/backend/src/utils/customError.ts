/**
 * Custom error types for the application.
 * These error types help categorize different kinds of errors
 * and provide consistent error handling throughout the app.
 */
export enum ErrorType {
  PLANNED = '[PLANNED_ERROR]',
  FATAL = '[FATAL_ERROR]'
}

/**
 * Interface for customError options
 */
interface CustomErrorOptions {
  name: string;
  message: string;
  customStack?: string;
  shouldThrow?: boolean;
}

/**
 * Creates a custom error with the specified type, name, and message.
 * 
 * @param errorType - The type of error (from ErrorType enum)
 * @param options - Object containing error details (name, message, customStack, shouldThrow)
 * @returns The created Error object if not thrown
 * @throws The created Error object if shouldThrow is true
 */
function createCustomError(
  errorType: ErrorType, 
  { name, message, shouldThrow = false, customStack }: CustomErrorOptions,
): Error {
  // Create the error object
  const error = new Error(message);
  error.name = `${errorType}${name}\n`;

  // Set the stack trace
  if (customStack) {
    error.stack = customStack;
  } else if (Error.captureStackTrace) {
    // This captures the stack trace without including the createCustomError function itself
    // Works in V8 engines (Node.js, Chrome)
    Error.captureStackTrace(error, createCustomError);
  }

  // Log the error for debugging purposes
  console.log(error);
  
  // Optionally throw the error
  if (shouldThrow) {
    throw error;
  }

  return error;
}

/**
 * Creates a planned error, which represents an expected or handled error condition.
 * Planned errors are used for conditions that are anticipated and handled gracefully.
 * 
 * @param name - A descriptive name for the error context
 * @param message - Detailed error message
 * @param customStack - Optional custom stack trace
 * @param shouldThrow - Whether to throw the error (default: false)
 * @returns The created Error object if not thrown
 * @throws The created Error object if shouldThrow is true
 */
export function PlannedError(
  name: string, 
  message: string, 
  shouldThrow: boolean = false,
  customStack?: string,
): Error {
  return createCustomError(ErrorType.PLANNED, { 
    name, 
    message, 
    shouldThrow,
    customStack,
  });
}

/**
 * Creates a fatal error, which represents a critical or unexpected error condition.
 * Fatal errors typically indicate conditions that prevent normal application functioning.
 * 
 * @param name - A descriptive name for the error context
 * @param message - Detailed error message
 * @param customStack - Optional custom stack trace
 * @param shouldThrow - Whether to throw the error (default: false)
 * @returns The created Error object if not thrown
 * @throws The created Error object if shouldThrow is true
 */
export function FatalError(
  name: string, 
  message: string, 
  shouldThrow: boolean = false,
  customStack?: string,
): Error {
  return createCustomError(ErrorType.FATAL, { 
    name, 
    message, 
    shouldThrow,
    customStack,
  });
}
