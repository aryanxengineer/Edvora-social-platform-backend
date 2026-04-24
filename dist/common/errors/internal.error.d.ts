import { AppError } from "./base.error.js";
export declare class InternalServerError extends AppError {
    statusCode: number;
    code: string;
    constructor(message?: string, details?: unknown);
}
//# sourceMappingURL=internal.error.d.ts.map