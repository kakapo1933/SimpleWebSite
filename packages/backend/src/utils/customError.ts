const plannedError = (name: string, message: string, customStack?: string): Error => {
  const error = new Error(`${message}`);
  error.name = `[PLANNED_ERROR]${name}\n`;

  if (customStack) {
    error.stack = customStack;
  } else if (Error.captureStackTrace) {
    Error.captureStackTrace(error, plannedError); // Capture stack trace from this function's caller (works in V8 engines)
  }
  console.log(error);
  return error;
};

const fatalError = (name: string, message: string, customStack?: string): Error => {
  const error = new Error(`${message}`);
  error.name = `[FATAL_ERROR]${name}\n`;

  if (customStack) {
    error.stack = customStack;
  } else if (Error.captureStackTrace) {
    Error.captureStackTrace(error, fatalError); // Capture stack trace from this function's caller (works in V8 engines)
  }
  console.log(error);
  return error;
}

export const PlannedError = plannedError;
export const FatalError = fatalError;