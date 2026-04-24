import { AppError } from "./base.error.js";
export declare class ConflictError extends AppError {
    statusCode: number;
    code: string;
    constructor(message?: string, details?: unknown);
}
//# sourceMappingURL=conflict.error.d.ts.map