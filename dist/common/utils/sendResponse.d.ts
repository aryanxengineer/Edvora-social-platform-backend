import { type Response } from "express";
export interface SendResponseParams<T> {
    res: Response;
    statusCode: number;
    message: string;
    data?: T;
    meta?: Record<string, unknown>;
}
export declare const sendResponse: <T>({ res, statusCode, message, data, meta }: SendResponseParams<T>) => Response<any, Record<string, any>>;
//# sourceMappingURL=sendResponse.d.ts.map