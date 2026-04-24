export declare abstract class AppError extends Error {
    abstract statusCode: number;
    abstract code: string;
    details?: unknown;
    protected constructor(message: string, details?: unknown);
}
//# sourceMappingURL=base.error.d.ts.map