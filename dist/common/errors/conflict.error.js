// src/common/errors/conflict.error.ts
import { AppError } from "./base.error.js";
export class ConflictError extends AppError {
    statusCode = 409;
    code = "CONFLICT";
    constructor(message = "Resource already exists", details) {
        super(message, details);
    }
}
//# sourceMappingURL=conflict.error.js.map