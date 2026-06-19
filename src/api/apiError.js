// src/api/apiError.js

export class ApiError extends Error {
  constructor({
    status = 500,
    type = "UNKNOWN",
    message = "Something went wrong",
    data = null,
    originalError = null,
  }) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.type = type;
    this.data = data;
    this.originalError = originalError;
  }
}
