class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = []) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    // Maintains proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
