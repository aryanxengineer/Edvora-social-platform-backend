import { AppError } from "./base.error.js";
export class InternalServerError extends AppError {
    statusCode = 500;
    code = "INTERNAL_SERVER_ERROR";
    constructor(message = "Internal server error", details) {
        super(message, details);
    }
}
//# sourceMappingURL=internal.error.js.map