import { AppError } from "./base.error.js";
export declare class BadRequestError extends AppError {
    statusCode: number;
    code: string;
    constructor(message?: string, details?: unknown);
}
//# sourceMappingURL=badRequest.error.d.ts.map