// src/common/errors/badRequest.error.ts
import { AppError } from "./base.error.js";
export class BadRequestError extends AppError {
    statusCode = 400;
    code = "BAD_REQUEST";
    constructor(message = "Invalid request payload", details) {
        super(message, details);
    }
}
//# sourceMappingURL=badRequest.error.js.map