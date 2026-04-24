class ApiError extends Error {
    statusCode;
    message;
    isOperational;
    constructor(statusCode, message, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;
        this.statusCode;
        this.isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
export default ApiError;
//# sourceMappingURL=ApiError.js.map