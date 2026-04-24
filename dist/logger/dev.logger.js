import winston from "winston";
export const devLogger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.printf(({ level, message, timestamp, ...meta }) => {
        return `[${timestamp}] ${level} : ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
    })),
    transports: [new winston.transports.Console()],
});
//# sourceMappingURL=dev.logger.js.map