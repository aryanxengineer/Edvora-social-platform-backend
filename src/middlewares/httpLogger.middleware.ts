import expressWinston from "express-winston";
import { logger } from "@logger/index.js";

export const httpLogger = expressWinston.logger({
  winstonInstance: logger,
  level: "http",
  msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
});
