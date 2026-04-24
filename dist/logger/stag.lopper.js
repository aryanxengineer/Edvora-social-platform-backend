import winston from "winston";
export const stagingLogger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
    defaultMeta: {
        service: "instagram-backend-staging",
    },
    transports: [new winston.transports.Console()],
});
//# sourceMappingURL=stag.lopper.js.map