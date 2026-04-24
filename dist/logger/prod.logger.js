import winston from "winston";
export const prodLogger = winston.createLogger({
    level: "info",
    format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
    defaultMeta: {
        service: "instagram-backend",
    },
    transports: [
        new winston.transports.Console(), // CloudWatch / GCP reads stdout
    ],
});
//# sourceMappingURL=prod.logger.js.map