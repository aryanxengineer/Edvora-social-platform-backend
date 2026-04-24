declare class ApiError extends Error {
    statusCode: number;
    message: string;
    isOperational: boolean;
    constructor(statusCode: number, message: string, isOperational?: boolean);
}
export default ApiError;
//# sourceMappingURL=ApiError.d.ts.map