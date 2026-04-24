// src/app/error.middleware.ts
import { AppError } from "@common/errors/base.error.js";
export const globalErrorHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            code: err.code,
            details: err.details,
        });
    }
    // fallback (never expose internal error)
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        code: "UNEXPECTED_ERROR",
    });
};
//# sourceMappingURL=error.middleware.js.map