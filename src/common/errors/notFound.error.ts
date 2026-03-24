
import { AppError } from "./base.error.js";

export class NotFoundError extends AppError {
  statusCode = 404;
  code = "NOT_FOUND";

  constructor(message = "Resource not found") {
    super(message);
  }
}
