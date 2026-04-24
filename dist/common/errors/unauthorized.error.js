import { AppError } from "./base.error.js";
export class UnauthorizedError extends AppError {
    statusCode = 401;
    code = "UNAUTHORIZED";
    constructor(message = "Unauthorized access") {
        super(message);
    }
}
//# sourceMappingURL=unauthorized.error.js.map