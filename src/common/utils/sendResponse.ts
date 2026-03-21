import { type ApiResponse } from "@common/types/response.types.js";
import { type Response } from "express";

export interface SendResponseParams<T> {
  res: Response;
  statusCode: number;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export const sendResponse = <T>({
  res,
  statusCode,
  message,
  data,
  meta
}: SendResponseParams<T>) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
    ...(meta !== undefined && { meta })
  };

  return res.status(statusCode).json(response);
};
