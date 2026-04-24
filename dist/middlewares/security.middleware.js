import helmet from "helmet";
import cors from "cors";
export const applyHelmet = (app) => {
    app.use(helmet({
        contentSecurityPolicy: false, // handled by frontend CDN
        crossOriginEmbedderPolicy: false,
    }));
};
export const applyCors = (app) => {
    app.use(cors({
        // origin: "*",
        origin: (origin, callback) => {
            const allowedOrigins = [
                "https://edvora.vercel.app",
            ];
            // Allow server-to-server & mobile apps
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    }));
};
//# sourceMappingURL=security.middleware.js.map